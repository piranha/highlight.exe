build: highlight.exe

highlight.exe: exe.js package.json
	bun build ./exe.js --compile --outfile $@
