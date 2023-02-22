import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class UsersFilterPipe implements PipeTransform {
  transform(users: any[], searchText: string): any[] {
    if (!searchText) {
      return users;
    }
  
    searchText = searchText.toLowerCase();
  
    return users.filter(user => {
      return user.name.toLowerCase().includes(searchText);
    });
  }
  
}
