import {config, ExcludedFileExtensions, IncludedFileExtensions} from "../config";
import {FileSystemCrawler} from "./crawlers/file-system-crawler";
import {TypeScriptFileCrawlerFactory} from "./crawlers/type-script-file-crawler-factory";
import {FileExtensionValidator} from "./crawlers/validators/file-extension-validator";
import {FileDeterminer} from "./crawlers/determiners/file-determiner";
import {DirectoryCrawler} from "./crawlers/directory-crawler";
import * as Table from 'cli-table';

const crawlingPath = process.argv[2] || config.DEFAULT_PATH;
const includedFileExtensions: IncludedFileExtensions = config.DEFAULT_FILE_INCLUDED_EXTENSIONS;
const excludedFileExtensions: ExcludedFileExtensions = config.DEFAULT_FILE_EXCLUDED_EXTENSIONS;

const table = new Table({
    head: ['What', 'Value', 'Average', 'Max']
});

startJourney();


function startJourney() {
    const fileExtensionValidator = new FileExtensionValidator(includedFileExtensions, excludedFileExtensions);
    const fileSystemCrawler = new FileSystemCrawler(
        crawlingPath, new TypeScriptFileCrawlerFactory(table), fileExtensionValidator, new FileDeterminer(),
        new DirectoryCrawler()
    );

    fileSystemCrawler.start();
}

