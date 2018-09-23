import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/services/auth.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  template: '',
})
export class AuthComponent implements OnInit {

  constructor(    
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const code: string = this.route.snapshot.queryParamMap.get('code');
    this.authService.getToken(code)
      .subscribe(data => console.log(data));
  }

}
