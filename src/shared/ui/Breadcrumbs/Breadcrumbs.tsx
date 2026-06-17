import { Breadcrumbs as MuiBreadcrumbs, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <MuiBreadcrumbs sx={{ my: 2 }}>
      <MuiLink component={Link} to="/users" underline="hover" color="primary">
        Главная
      </MuiLink>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast || !item.to) {
          return (
            <Typography key={index} color="text.primary">
              {item.label}
            </Typography>
          );
        }

        return (
          <MuiLink key={index} component={Link} to={item.to} underline="hover" color="primary">
            {item.label}
          </MuiLink>
        );
      })}
    </MuiBreadcrumbs>
  );
};
