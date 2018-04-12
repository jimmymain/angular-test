import * as R from "ramda";
import * as $ from "jquery";
import 'rxjs/add/operator/catch';


/**
 * a container for a page of results.
 * of type {T}
 */
export class Page<T> {
    /**
     * the current page number.
     */
    page: number;

    /**
     * the number of items in each page.
     */
    pageSize?: number;

    /**
     * the total number of items.
     */
    total?: number;

    /**
     * the set of items on the page.
     */
    items?: Array<T>;
};

/**
 * options to initialise the page list.
 */
export interface IPageOptions<T> {
    /**
     * function used to retrieve a page of {T}
     * @param page the page number to return.
     * @returns a page of results of type {T} 
     */
    get(page: number): Promise<Page<T>>;

    /**
     * the current page details.
     */
    page: Page<T>;

    /**
     * data collection has been initiated.
     * @returns {} 
     */
    start?(): void;

    /**
     * data collection is now complete.
     * @param success true if the page is rendered.
     */
    complete?(success: boolean): void;

    /**
     * the set of page links.
     */
    links?: JQuery;
}

/**
 * page service interface.
 */
interface IPageService<T> {
    /**
     * initialise the page manager with the supplied options.
     * @param options the set of Page{T} options.
     */
    load(options: IPageOptions<T>): void;

    /**
     * select a particular page.
     * @param page the page number to select.
     */
    select(page: number): void;
}

/**
 * page manager implementation.
 */
export class PageManager<T> implements IPageService<T> {
    /**
     * log function
     * @param message the message to log.
     * @param optionalParams set of parameters.
     */
    log: (message?: any, ...optionalParams: any[]) => void;

    /**
     * method used to return the next page.
     * @param page 
     * @returns {} 
     */
    get: (page: number) => Promise<Page<T>>;

    /**
     * find the minumum element in an array.
     * @param list the array of numbers.
     */
    min: (list: number[]) => number;

    /**
     * find the maximum element in an array.
     * @param list the array of numbers.
     */
    max: (list: number[]) => number;

    /**
     * the current page details.
     */
    current: Page<T>;

    /**
     * the set of page options.
     */
    options: IPageOptions<T>;

    /**
     * jquery link for the page links.
     */
    link: JQuery<Node>;


    /**
     * construct the page manager.
     */
    constructor() {
        this.log = console ? console.log : null;
        this.min = R.reduce<number, number>(R.min, Infinity);
        this.max = R.reduce<number, number>(R.max, -Infinity);

        // click event(s) for the page links.
        $(document).on(
            "click",
            "a[data-page]",
            (event) => { this.select.call(this, $(event.target).attr("data-page")); });
    }

    /**
     * initialise the page manager with the supplied options.
     * @param options the set of Page{T} options.
     */
    public load(options: IPageOptions<T>): void {
        this.current = options.page;
        this.get = options.get;
        this.options = options;
        this.link = options.links || $("#page-links");
        this.select(1);
    }

    /**
     * select a particular page.
     * @param page the page to select.
     */
    public select(page: number): void {
        this.options.start && this.options.start();
        this.current.page = page;
        this.log(`fetching page ${this.current.page}.`);
        this.get(this.current.page)
            .then((page: Page<T>) => this.set(page))
            .then(() => this.options.complete && this.options.complete(true))
            .catch(() => this.options.complete && this.options.complete(true));
    };

    /**
     * set the current page details with the returned values.
     * @param items the page of items returned.
     */
    private set(page: Page<T>):void {
        this.current.page = page.page;
        this.current.items = page.items;
        this.current.total = page.total;
        this.current.pageSize = page.pageSize;
        this.log(`page manager executed page ${this.current.page}, (${page.page}:${page.pageSize}:${page.total}), ${page.items.length}`);
        this.createPageLinks();
    };

    /**
     * create the set of page links.
     */
    private createPageLinks(): void {

        // no page(s) returned
        if (this.current.items == null || this.current.items.length === 0) {
            this.link.html("");
            return;
        }

        const numbers:number[] = this.calculatePageArray(9);
        let pageLinks:JQuery[] = numbers.map((page:number) => $("<li/>", {
            "class": page === this.current.page ? "active" : "",
            html: this.alink(page)
        }));

        if (this.min(numbers) > 1)
            pageLinks = [$("<li/>", { html: this.alink(1) }), this.divider()].concat(pageLinks);

        if (this.max(numbers) < this.calculateTotalPages()) {
            if (this.max(numbers) < this.calculateTotalPages() - 1)
                pageLinks.push(this.divider(true));
            pageLinks.push($("<li/>", { html: this.alink(this.calculateTotalPages()) }));
        }
        const links:JQuery = $("<ul/>", {
            "class": "pagination",
            html: pageLinks
        });
        this.link.html(<any>links);
    }

    /**
     * create a divider, showing a gap in the page numbers.
     * @param end true if the divider is the last page.
     */
    private divider(end?: boolean):JQuery {
        return $("<li/>", {
            "class": "disabled",
            html: $("<a/>", {
                html: end ? "...&nbsp;&nbsp;" : "&nbsp;&nbsp;..."
            })
        });
    }

    /**
     * create an anchor link to a particular page.
     * @param page the page number to create.
     */
    private alink(page: number):JQuery {
        return $("<a/>", {
            "data-page": String(page),
            "style": "cursor:pointer",
            text: page
        });
    }

    /**
     * calculate how many pages there are altogether.
     */
    private calculateTotalPages(): number {
        // check if there is a last page.
        const extra:number = (this.current.total % this.current.pageSize) > 0 ? 1 : 0;
        // return the total pages + the last page, if there is one.
        return Math.trunc(this.current.total / this.current.pageSize) + extra;
    }

    /**
     * create an array of page numbers for display
     * @param count the number of pages to create.
     */
    private calculatePageArray(count: number): number[] {
        var pages:number[] = [this.current.page];
        while (pages.length < count) {
            if (this.min(pages) > 1) pages.push(this.min(pages) - 1);
            if (this.max(pages) < this.calculateTotalPages()) pages.push(this.max(pages) + 1);
            if (this.min(pages) === 1 && this.max(pages) >= this.calculateTotalPages())
                break;
        }
        pages.sort((x:number, y:number) => x - y);
        return pages;
    }
}