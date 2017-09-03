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

        public string AudioFilePath { get; set; }

        public void Validate()
        {
            Guard.This(FilePath)
                .AgainstNullOrEmpty(FilePath);

            Guard.This(FilePath)
                .WithRule(p => p.EndsWith(".mp4"), string.Format("File '{0}' must be an mp4 video file", FilePath));

            Guard.This(FilePath)
                .WithRule(p => File.Exists(FilePath), string.Format("File '{0}' does not exist", FilePath));

            Guard.This(AudioFilePath)
                .AgainstNullOrEmpty(AudioFilePath);

            Guard.This(AudioFilePath)
                .WithRule(p => p.EndsWith(".mp3"), $"File {AudioFilePath} must be an mp3 audio file");

            Guard.This(AudioFilePath)
                .WithRule(p => File.Exists(AudioFilePath), $"Audio file path {AudioFilePath} does not exist");
        }

        public bool DoesFilePathExist()
        {
            return File.Exists(FilePath);
        }
    }
}
