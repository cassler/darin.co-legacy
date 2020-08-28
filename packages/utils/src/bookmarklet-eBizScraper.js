function onlyUnique(value, index, self) {
return self.indexOf(value) === index;
}
function copyToClipboard(str) {
const el = document.createElement('textarea');
el.value = str;
el.setAttribute('readonly', '');
el.style.position = 'absolute';
el.style.left = '-9999px';
document.body.appendChild(el);
const selected =
document.getSelection().rangeCount > 0
? document.getSelection().getRangeAt(0)
: false;
el.select();
document.execCommand('copy');
document.body.removeChild(el);
if (selected) {
document.getSelection().removeAllRanges();
document.getSelection().addRange(selected);
  }
};
var rows = [...document.getElementById('dealer.editable-list').getElementsByTagName('tr')].map(row => {
var [id, name] = row.innerText.split(' - ');
let fName = name.substring(0, name.length - 1).trim()
	return `${id},${fName}`
}).filter(onlyUnique);
var csvString = 'EBIZ_ID,NAME\n' + rows.join(',\n')
copyToClipboard(csvString)
console.log(`Copied ${rows.length} items to clipboard. Save this as a CSV.`)
