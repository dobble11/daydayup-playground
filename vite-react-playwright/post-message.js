// 发送测试报告到企微群

const { default: axios } = require('axios');
const fs = require('node:fs');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

function postMsgToQw(content) {
  return axios({
    url: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxxxx',
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
    const { time, tests, failures } = testsuites.$;
    const msg = `总数: ${tests}  失败: ${failures}  耗时: ${Math.floor(time)}s\n\n
   ${testsuites.testsuite
     .map(
       (m) => `${m.$.name}\n
       ${m.testcase
         .map(
           (c) =>
             `>${c.failure ? '<font color="warning">✕</font>' : '<font color="info">✓</font>'} ${
               c.$.name
             } (${c.$.time * 1000} ms)`,
         )
         .join('\n')}`,
     )
     .join('\n')}\n\n流水线地址：${process.env.CI_PIPELINE_URL}`;

    postMsgToQw(msg);
  }
}

main();
