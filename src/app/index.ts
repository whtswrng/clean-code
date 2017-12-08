import {config, IncludedFileExtensions} from "../config";
import {FileSystemCrawler} from "./crawlers/file-system-crawler";
import {FileCrawlerFactory} from "./crawlers/file-crawler-factory";
import {FileExtensionValidator} from "./crawlers/validators/file-extension-validator";
import {FileDeterminer} from "./crawlers/determiners/file-determiner";
import {DirectoryCrawler} from "./crawlers/directory-crawler";

const crawlingPath = process.argv[2] || config.DEFAULT_PATH;
const crawlingFileExtensions: IncludedFileExtensions = config.DEFAULT_FILE_INCLUDED_EXTENSIONS;

startJourney();

function startJourney() {
    const fileSystemCrawler = new FileSystemCrawler(
        crawlingPath, new FileCrawlerFactory(), new FileExtensionValidator(crawlingFileExtensions),
        new FileDeterminer(), new DirectoryCrawler()
    );

    fileSystemCrawler.start();
}

