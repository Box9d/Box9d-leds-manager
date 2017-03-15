$apiOutputDir = "$($PSScriptRoot)\api\src\Box9.Leds.Manager.WebHost\bin\x86\"
$apiBuildDir = "$($PSScriptRoot)\build\api"
$buildDir = "$($PSScriptRoot)\build"
If (Test-Path $buildDir)
{
    Remove-Item $buildDir -Recurse
}

New-Item $buildDir -type directory
New-Item $apiBuildDir -type directory
Copy-Item $apiOutputDir\* $apiBuildDir -Recurse
get-childitem "$($PSScriptRoot)\build\api\*.pdb" -recurse | foreach ($_) { remove-item $_.FullName }

<#IF EXIST %~dp0build (rd %~dp0build /s /q)
mkdir %~dp0build
robocopy %~dp0api\src\Box9.Leds.Manager.WebHost\bin\x86 %~dp0build\api
del /s /q /f %~dp0build\*.pdb#>