build: highlight.exe
gzip: highlight.exe.gz

highlight.exe: exe.js package.json
	bun build ./exe.js --compile --outfile $@

highlight.exe.gz: highlight.exe
	gzip $^
