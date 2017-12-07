import {config, IncludedFileExtensions} from "../config";
import {FileSystemCrawler} from "./crawlers/file-system-crawler";
import {FileCrawlerFactory} from "./crawlers/file-crawler-factory";
import {FileValidator} from "./crawlers/validators/file-validator";

const crawlingPath = process.argv[2] || config.DEFAULT_PATH;
const crawlingFileExtensions: IncludedFileExtensions = config.DEFAULT_FILE_INCLUDED_EXTENSIONS;

startJourney();

function startJourney() {
    const fileSystemCrawler = new FileSystemCrawler(
        crawlingPath, new FileCrawlerFactory(), new FileValidator(crawlingFileExtensions)
    );
    fileSystemCrawler.start();
}
