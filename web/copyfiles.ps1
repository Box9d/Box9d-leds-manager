$distDir = "$($PSScriptRoot)\dist"
$assetsSourceDir = "$($PSScriptRoot)\src\assets"
$assetsTargetDir = "$($distDir)\assets"
$reactSourceDir = "$($PSScriptRoot)\node_modules\react\dist"
$reactTargetDir = "$($distDir)\lib\react\dist"
$reactDomSourceDir = "$($PSScriptRoot)\node_modules\react-dom\dist"
$reactDomTargetDir = "$($distDir)\lib\react-dom\dist"
$htmlFileSource = "$($PSScriptRoot)\src\index.html"

If (-not (Test-Path $distDir))
{
    New-Item $distDir -type directory
    New-Item $reactTargetDir -type directory
    New-Item $reactDomTargetDir -type directory
}

Copy-Item $assetsSourceDir $assetsTargetDir -Recurse -Force
Copy-Item "$($reactSourceDir)\react.js" $reactTargetDir -Force
Copy-Item "$($reactDomSourceDir)\react-dom.js" $reactDomTargetDir -Force
Copy-Item "$($htmlFileSource)" $distDir -Force
