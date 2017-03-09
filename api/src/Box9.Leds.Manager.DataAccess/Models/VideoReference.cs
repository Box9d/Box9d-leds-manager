using System.IO;
using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataModels;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Models
{
    [Table("VideoReference")]
    public class VideoReference : IDataModel, IValidatable
    {
        [ExplicitKey]
        public int Id { get; set; }

        public string FilePath { get; set; }

        public void Validate()
        {
            Guard.This(FilePath)
                .AgainstNullOrEmpty(FilePath);

            Guard.This(FilePath)
                .WithRule(p => p.EndsWith(".mp4"), string.Format("File '{0}' must be an mp4 video file", FilePath));
        }

        public bool DoesFilePathExist()
        {
            return File.Exists(FilePath);
        }
    }
}
