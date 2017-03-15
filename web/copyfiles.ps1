$distDir = "$($PSScriptRoot)\dist"
$assetsSourceDir = "$($PSScriptRoot)\src\assets"
$assetsTargetDir = "$($distDir)\assets"
$reactSourceDir = "$($PSScriptRoot)\node_modules\react\dist"
$reactTargetDir = "$($distDir)\lib\react\dist"
$reactDomSourceDir = "$($PSScriptRoot)\node_modules\react-dom\dist"
$reactDomTargetDir = "$($distDir)\lib\react-dom\dist"

If (Test-Path $distDir)
{
    Remove-Item $distDir -Recurse
}

New-Item $distDir -type directory
New-Item $reactTargetDir -type directory
New-Item $reactDomTargetDir -type directory
Copy-Item $assetsSourceDir $assetsTargetDir -Recurse
Copy-Item "$($reactSourceDir)\react.js" $reactTargetDir
Copy-Item "$($reactDomSourceDir)\react-dom.js" $reactDomTargetDir
