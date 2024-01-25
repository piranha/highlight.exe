import hljs from 'highlight.js';
import fs from 'fs';

function getopt() {
  let arr = process.argv.slice(2);
  let opts = {};
  for (var i = 0; i < arr.length;) {
    let k = arr[i];
    let v = arr[i+1];
    if (!v || v.startsWith('-')) {
      opts[k] = true;
      i++;
    } else {
      opts[k] = v;
      i+=2;
    }
  }
  return opts;
}

function main() {
  let opts = getopt();

  if (opts['--version']) {
    console.log(hljs.versionString);
    process.exit();
  }

  if (opts['--langs']) {
    let res = hljs.listLanguages().map(l => {
      let x = hljs.getLanguage(l);
      return {lexer: l, name: x.name, aliases: x.aliases};
    });
    console.log(JSON.stringify(res));
    process.exit();
  }

  let stdin = fs.readFileSync(0, 'utf-8');
  let lang = opts['--lang'] || 'guess';

  if (lang == 'guess') {
    let res = hljs.highlightAuto(stdin);
    console.log(res.language);
    console.log(res.value);
  } else {
    console.log(lang);
    console.log(hljs.highlight(stdin, {language: lang, ignoreIllegals: true}).value);
  }
}

main();
