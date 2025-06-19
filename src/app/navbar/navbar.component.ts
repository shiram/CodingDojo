import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  searchQuery: string = '';
  user = {
    name: 'Clyde Miles',
    avatar: '/placeholder.svg?height=32&width=32'
  };
  
  notificationCount = 3;
  messageCount = 2;

  toggleSidebar(): void {
    console.log('Toggle sidebar');
    // Implement sidebar toggle logic
  }

  onSearch(): void {
    console.log('Search query:', this.searchQuery);
    // Implement search logic
  }

  openNotifications(): void {
    console.log('Open notifications');
    // Implement notifications logic
  }

  openMessages(): void {
    console.log('Open messages');
    // Implement messages logic
  }

  openSettings(): void {
    console.log('Open settings');
    // Implement settings logic
  }

  openProfile(): void {
    console.log('Open profile');
    // Implement profile logic
  }

  logout(): void {
    console.log('Logout');
    // Implement logout logic
  }
}