if not exist "%~dp0dist" (rd /S /Q "%~dp0dist")

robocopy "%~dp0src/assets" "%~dp0dist/assets" /E /S /is /it
robocopy "%~dp0src" "%~dp0dist" index.html /is /it
robocopy "%~dp0node_modules/react/dist" "%~dp0dist/lib/react/dist" react.js /is /it
robocopy "%~dp0node_modules/react-dom/dist" "%~dp0dist/lib/react-dom/dist" react-dom.js /is /it
exit 0
