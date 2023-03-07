// 发送测试报告到企微群

const { default: axios } = require('axios');
const fs = require('node:fs');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

function postMsgToQw(content) {
  return axios({
    url: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxxxxx',
    method: 'post',
    data: {
      msgtype: 'markdown',
      markdown: {
        content,
      },
    },
  });
}

async function main() {
  if (fs.existsSync('je2e.xml')) {
    const xml = fs.readFileSync('je2e.xml', 'utf8').toString();
    const result = await parser.parseStringPromise(xml);
    const { testsuites } = result;
    const failures = Number(testsuites.$.failures);
    const tests = Number(testsuites.$.tests);
    const msg = `总数: ${tests}  失败: ${failures}  耗时: ${testsuites.$.time}s\n\n
   ${testsuites.testsuite
     .map(
       (m) => `${m.$.name}\n
       ${m.testcase

         .map(
           (c) =>
             `>${c.failure ? '<font color="warning">✕</font>' : '<font color="info">✓</font>'} ${
               c.$.name.split(' ')[1]
             } (${c.$.time * 1000} ms)`,
         )
         .join('')}`,
     )
     .join('\n')}`;

    postMsgToQw(msg);
  }
}

main();
