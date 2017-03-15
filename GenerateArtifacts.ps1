$apiOutputDir = "$($PSScriptRoot)\api\src\Box9.Leds.Manager.WebHost\bin\x86\"
$webOutputDir = "$($PSScriptRoot)\web\dist"
$buildDir = "$($PSScriptRoot)\build"

If (Test-Path $buildDir)
{
    Remove-Item $buildDir -Recurse
}

# Copy API Output
New-Item $buildDir -type directory
Copy-Item $apiOutputDir\* $buildDir -Recurse
get-childitem "$($buildDir)\*.pdb" -recurse | foreach ($_) { remove-item $_.FullName }

# Copy Web output
Copy-Item $webOutputDir\* $buildDir -Recurse
get-childitem "$($buildDir)\*.map" -recurse | foreach ($_) { remove-item $_.FullName }

# Update WebHost settings
$appConfigFile = [IO.Path]::Combine($buildDir, './Box9.Leds.Manager.WebHost.exe.config')
$appConfig = New-Object XML
$appConfig.Load($appConfigFile)
foreach($appSetting in $appConfig.configuration.appSettings.add)
{
    If($appSetting.key -eq 'HtmlFilePath')
    {
         $appSetting.value = '.\index.html'
    }
}
$appConfig.Save($appConfigFile)


