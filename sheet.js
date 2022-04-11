import XlsxParser from 'node-xlsx';

const defaultOptions = {
  index: 0, // 列名
  hasHeader: true, // Excel 是否有表头
  path: './list.xlsx', // Excel 文件路径
};

export const excelParser = (options = defaultOptions) => {
  const [sheet] = XlsxParser.parse(options.path);

  let source;
  if (options.hasHeader) {
    const [h, ...rest] = sheet.data;
    source = h.reduce(
      (prev, current) => ({ ...prev, [current]: [] }),
      {}
    );
    rest.forEach((item) =>
      item.forEach(((val, index) => source[h[index]].push(val)))
    );
  } else {
    const columnLength = sheet.data[0]?.length || 0;
    source = {};
    for (let index = 0; index < columnLength; index++) {
      source[index] = [];
    }
    sheet.data.forEach((item) =>
      item.forEach(((val, index) => source[index].push(val)))
    );
  }
  return source[options.index];
}
