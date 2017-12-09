import {FileCrawler} from "../file-crawler";
import {LineReader} from "../line-readers/line-reader";

export function prepareFileForCrawling(fileParser, path) {
    const fileCrawler = new FileCrawler(path, new LineReader(path));
    fileCrawler.addFileParser(fileParser);
    return fileCrawler;
}
