export interface MenuChild {
    menuName: string;
    viewName: string;
    viewRoute: string;
  }
  
  export interface MenuDataDTO {
    menuparent: string;
    menuchildren: MenuChild[];
  }