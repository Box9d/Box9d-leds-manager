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
                .WithRule(p => File.Exists(p), string.Format("File '{0}' does not exist", FilePath));
        }

        public bool DoesFilePathExist()
        {
            return File.Exists(FilePath);
        }
    }
}
