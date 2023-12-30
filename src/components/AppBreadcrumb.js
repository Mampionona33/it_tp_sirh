import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const pathSegments = pathname.split('/').filter((segment) => segment !== '') // Ignorer les segments vides
    for (const route of routes) {
      const routeSegments = route.path.split('/').filter((segment) => segment !== '')
      if (pathSegments.length === routeSegments.length) {
        const match = routeSegments.every((segment, index) => {
          return segment.startsWith(':') || segment === pathSegments[index]
        })
        if (match) {
          return route.name
        }
      }
    }
    return false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)

      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2 ">
      <CBreadcrumbItem className="text-orange-900 text-sm" href="/">
        Home
      </CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            className="text-sm"
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
