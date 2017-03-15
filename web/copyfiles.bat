rd dist /s /q
mkdir dist
robocopy ./src/assets ./dist/assets /E /S
robocopy ./src ./dist index.html
robocopy ./node_modules/react/dist ./dist/lib/react/dist react.js
robocopy ./node_modules/react-dom/dist ./dist/lib/react-dom/dist react-dom.js
exit 0

