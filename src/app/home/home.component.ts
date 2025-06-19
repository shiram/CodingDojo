import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  dashboardCards = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: 'users'
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+8%',
      changeType: 'positive',
      icon: 'dollar'
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '-3%',
      changeType: 'negative',
      icon: 'shopping'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      changeType: 'positive',
      icon: 'trending'
    }
  ];

  recentActivities = [
    {
      user: 'John Doe',
      action: 'created a new project',
      time: '2 minutes ago',
      avatar: '/placeholder.svg?height=32&width=32'
    },
    {
      user: 'Sarah Wilson',
      action: 'updated user profile',
      time: '15 minutes ago',
      avatar: '/placeholder.svg?height=32&width=32'
    },
    {
      user: 'Mike Johnson',
      action: 'completed task #247',
      time: '1 hour ago',
      avatar: '/placeholder.svg?height=32&width=32'
    },
    {
      user: 'Emily Davis',
      action: 'uploaded new document',
      time: '2 hours ago',
      avatar: '/placeholder.svg?height=32&width=32'
    }
  ];
}