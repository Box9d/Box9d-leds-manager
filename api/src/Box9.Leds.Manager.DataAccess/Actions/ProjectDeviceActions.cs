﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Box9.Leds.Manager.DataAccess.Extensions;
using Box9.Leds.Manager.DataAccess.Models;
using Dapper;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Actions
{
    public static class ProjectDeviceActions
    {
        public static DataAccessAction<Project> GetProjectFromProjectDeviceId(int projectDeviceId)
        {
            return new DataAccessAction<Project>((IDbConnection conn) =>
            {
                return conn.Query<Project>("SELECT Project.* FROM ProjectDevice INNER JOIN Project ON ProjectDevice.projectid = Project.id WHERE ProjectDevice.id = @projectdeviceid", new { projectDeviceId })
                    .SingleOrDefault();
            });
        }

        public static DataAccessAction<IEnumerable<ProjectDevice>> GetProjectDevices(int projectId)
        {
            return new DataAccessAction<IEnumerable<ProjectDevice>>((IDbConnection conn) =>
            {
                return conn.Query<ProjectDevice>("SELECT * FROM ProjectDevice WHERE projectid = @projectid", new { projectId });
            });
        }

        public static DataAccessAction SetProjectDevicePlaybackStatus(int projectId, int deviceId, bool readyForPlayback)
        {
            return new DataAccessAction((IDbConnection conn) =>
            {
                var projectDevice = conn.Query<ProjectDevice>("SELECT * FROM ProjectDevice WHERE deviceid = @deviceid AND projectid = @projectid", new { deviceId, projectId })
                    .SingleOrDefault();

                if (projectDevice == null)
                {
                    throw new ArgumentException(string.Format("No project device found for project with Id '{0}' and Device with Id '{1}'", projectId, deviceId));
                }

                projectDevice.ReadyForPlayback = readyForPlayback ? 1 : 0;

                conn.Update(projectDevice);
            });
        }

        public static DataAccessAction<ProjectDeviceVersion> GetProjectDeviceVersion(int projectDeviceVersionId)
        {
            return new DataAccessAction<ProjectDeviceVersion>((IDbConnection conn) =>
            {
                return conn.Get<ProjectDeviceVersion>(projectDeviceVersionId);
            });
        }

        public static DataAccessAction<ProjectDeviceVersion> GetLatestProjectDeviceVersion(int projectDeviceId)
        {
            return new DataAccessAction<ProjectDeviceVersion>((IDbConnection conn) =>
            {
                return conn
                    .Query<ProjectDeviceVersion>("SELECT Version FROM ProjectDeviceVersion WHERE projectdeviceid = @projectdeviceid ORDER BY VERSION DESC LIMIT 1",
                        new { projectDeviceId })
                    .SingleOrDefault();
            });
        }

        public static DataAccessAction<ProjectDeviceVersion> SetLatestProjectDeviceVersion(ProjectDeviceVersion projectDeviceVersion)
        {
            return new DataAccessAction<ProjectDeviceVersion>((IDbConnection conn) =>
            {
                projectDeviceVersion.Validate();

                var currentVersion = conn.Query<int>("SELECT Version FROM ProjectDeviceVersion WHERE projectdeviceid = @projectdeviceid ORDER BY Version DESC LIMIT 1", 
                    new { projectDeviceVersion.ProjectDeviceId })
                    .SingleOrDefault();

                var id = conn.GetNextId<ProjectDeviceVersion>();

                projectDeviceVersion.Id = id;
                projectDeviceVersion.Version = currentVersion == 0 ? 1 : currentVersion + 1;

                conn.Insert(projectDeviceVersion);
                return projectDeviceVersion;
            });
        }

        public static DataAccessAction<ProjectDeviceVersion> UndoLatestProjectDeviceVersion(int projectDeviceId)
        {
            return new DataAccessAction<ProjectDeviceVersion>((IDbConnection conn) =>
            {
                var currentVersion = conn.Query<ProjectDeviceVersion>("SELECT * FROM ProjectDeviceVersion WHERE projectdeviceid = @projectdeviceid ORDER BY Version DESC LIMIT 1",
                    new { projectDeviceId })
                    .SingleOrDefault();

                if (currentVersion != null)
                {
                    var versionMappings = conn.Query<ProjectDeviceVersionMapping>(
                            @"SELECT * FROM ProjectDeviceVersionMapping " +
                            @"WHERE projectdeviceversionid = @projectdeviceversionid",
                            new { ProjectDeviceVersionId = currentVersion.Id });

                    using (var transaction = conn.BeginTransaction())
                    {
                        try
                        {
                            foreach (var mapping in versionMappings)
                            {
                                conn.Delete(mapping, transaction);
                            }

                            conn.Delete(currentVersion, transaction);

                            transaction.Commit();
                        }
                        catch
                        {
                            transaction.Rollback();
                            throw;
                        }
                    }

                    return conn.Query<ProjectDeviceVersion>("SELECT * FROM ProjectDeviceVersion WHERE projectdeviceid = @projectdeviceid ORDER BY Version DESC LIMIT 1",
                        new { projectDeviceId })
                        .SingleOrDefault();
                }

                return null;
            });
        }

        public static DataAccessAction<IEnumerable<ProjectDeviceVersionMapping>> GetProjectDeviceMappings(int projectDeviceVersionId)
        {
            return new DataAccessAction<IEnumerable<ProjectDeviceVersionMapping>>((IDbConnection conn) =>
            {
                return conn.Query<ProjectDeviceVersionMapping>("SELECT * FROM ProjectDeviceVersionMapping WHERE projectdeviceversionid = @projectdeviceversionid", new { projectDeviceVersionId });
            });
        }

        public static DataAccessAction<ProjectDeviceVersion> SetProjectDeviceMappings(int projectDeviceVersionId, IEnumerable<ProjectDeviceVersionMapping> mappings)
        {
            return new DataAccessAction<ProjectDeviceVersion>((IDbConnection conn) =>
            {
                // Update to new version of project device before setting mappings
                var deviceVersion = GetProjectDeviceVersion(projectDeviceVersionId).Function(conn);

                using (var transaction = conn.BeginTransaction())
                {
                    try
                    {
                        var currentMappings = GetProjectDeviceMappings(projectDeviceVersionId).Function(conn);

                        foreach (var mapping in currentMappings)
                        {
                            conn.Delete(mapping, transaction);
                        }

                        var nextId = conn.GetNextId<ProjectDeviceVersionMapping>();

                        foreach (var mapping in mappings)
                        {
                            mapping.Validate(deviceVersion);
                            mapping.Id = nextId;
                            mapping.ProjectDeviceVersionId = projectDeviceVersionId;
                            conn.Insert(mapping, transaction);

                            nextId++;
                        }

                        transaction.Commit();
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }

                return deviceVersion;
            });
        }
    }
}
