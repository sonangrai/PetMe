/**
 * Class for pagination response
 * page : current page number
 * pageSize : total item in one page
 * totalItem : total items
 */
class respPagination {
  page: number;
  pageSize: number;
  totalItem: number;

  constructor(page: number, pageSize: number, totalItem: number) {
    this.page = page;
    this.pageSize = pageSize;
    this.totalItem = totalItem;
  }
}

export default respPagination;
