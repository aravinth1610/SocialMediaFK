import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { UserModal } from '../modal/user-modal';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileUser: UserModal;

  profilePhoto: string;
  coverPhoto: string;
  pageSize: number = 5;

  private subscriptions: Subscription[] = [];

  constructor(private authServices: AuthService, private profileServices: ProfileService, private router: Router) { }

  ngOnInit(): void {
    const authUserId = this.authServices.getAuthUsername();
    this.subscriptions.push(
      this.profileServices.getUserById(authUserId).subscribe({
        next: (postResponse: UserModal) => {
          if (!postResponse.profilePhoto) {
            postResponse.profilePhoto = environment.defaultprofilePhoto;
          }

          if (!postResponse.coverPhoto) {
            postResponse.coverPhoto = environment.defaultCoverPhoto;
          }
          this.profileUser = postResponse;
          console.log(this.profileUser);
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.router.navigate(['']);
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscribe => subscribe.unsubscribe());
  }


  loadProfilePost(currentPage: number): void {
     this.profileServices.getUserPost()
  }


}
