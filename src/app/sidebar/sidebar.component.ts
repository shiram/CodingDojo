import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  hasSubmenu?: boolean;
  isExpanded?: boolean;
  submenuItems?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  user = {
    name: 'Clyde Miles',
    email: 'clydemiles@elenor.us',
    avatar: '/placeholder.svg?height=40&width=40'
  };

  menuItems: MenuItem[] = [
    {
      icon: 'home',
      label: 'Dashboard',
      route: '/dashboard'
    },
    {
      icon: 'clipboard',
      label: 'Forms',
      route: '/forms'
    },
    {
      icon: 'grid',
      label: 'UI Features',
      hasSubmenu: true,
      isExpanded: false,
      submenuItems: [
        { icon: 'circle', label: 'Buttons', route: '/ui/buttons' },
        { icon: 'circle', label: 'Cards', route: '/ui/cards' },
        { icon: 'circle', label: 'Modals', route: '/ui/modals' }
      ]
    },
    {
      icon: 'table',
      label: 'Tables',
      route: '/tables'
    },
    {
      icon: 'bar-chart',
      label: 'Charts',
      route: '/charts'
    },
    {
      icon: 'layers',
      label: 'Sample Pages',
      hasSubmenu: true,
      isExpanded: false,
      submenuItems: [
        { icon: 'circle', label: 'Profile', route: '/pages/profile' },
        { icon: 'circle', label: 'Settings', route: '/pages/settings' },
        { icon: 'circle', label: 'Help', route: '/pages/help' }
      ]
    },
    {
      icon: 'book',
      label: 'Documentation',
      route: '/documentation'
    }
  ];

  toggleSubmenu(item: MenuItem): void {
    if (item.hasSubmenu) {
      item.isExpanded = !item.isExpanded;
    }
  }

  navigateTo(route: string): void {
    console.log('Navigate to:', route);
    // Implement navigation logic here
  }

  logout(): void {
    console.log('Logout clicked');
    // Implement logout logic here
  }

  openSettings(): void {
    console.log('Settings clicked');
    // Implement settings logic here
  }
}