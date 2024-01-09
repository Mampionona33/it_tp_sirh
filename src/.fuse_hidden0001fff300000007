import { exact } from 'prop-types'
import lazyWithRetry from './utils/lazyWithRetry'

// const Dashboard = lazyWithRetry(() => import('./views/dashboard/Dashboard'))
const Dashboard = lazyWithRetry(() => import('./views/employee/list/List'))
const Colors = lazyWithRetry(() => import('./views/theme/colors/Colors'))
const Typography = lazyWithRetry(() => import('./views/theme/typography/Typography'))

// Employés
// const ListEmployes = lazyWithRetry(() => import('./views/employee/list/List'))
const ListEmployes = lazyWithRetry(() => import('@views/employee/list/List'))
const FicheEmploye = lazyWithRetry(() => import('src/views/employee/fiche/Fiche'))
const BulletinPaie = lazyWithRetry(() =>
  import('src/views/gestion-paie/bulletinDePaie/BulletinPaie'),
)
const AjoutEmploye = lazyWithRetry(() => import('@views/employee/ajout/AjoutEmploye'))

// Gestion de paie
const GestionPaie = lazyWithRetry(() => import('@views/gestion-paie/GestionPaie'))
const HistoriquePaie = lazyWithRetry(() =>
  import('@src/views/gestion-paie/historique/HistoriquePaie'),
)
const ValidePaie = lazyWithRetry(() => import('@views/gestion-paie/valider-paie/ValidePaie'))
// Etat divers
const DeclarationCnaps = lazyWithRetry(() =>
  import('src/views/etats_divers/declarationCnaps/DeclarationCnaps'),
)
const DetailPaieValide = lazyWithRetry(() =>
  import('src/views/gestion-paie/details/DetailPaieValide'),
)

// Administration
const ImportHeures = lazyWithRetry(() =>
  import('src/views/administration/ImportHeures/ImportHeures'),
)

// Base
const Accordion = lazyWithRetry(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = lazyWithRetry(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = lazyWithRetry(() => import('./views/base/cards/Cards'))
const Carousels = lazyWithRetry(() => import('./views/base/carousels/Carousels'))
const Collapses = lazyWithRetry(() => import('./views/base/collapses/Collapses'))
const ListGroups = lazyWithRetry(() => import('./views/base/list-groups/ListGroups'))
const Navs = lazyWithRetry(() => import('./views/base/navs/Navs'))
const Paginations = lazyWithRetry(() => import('./views/base/paginations/Paginations'))
const Placeholders = lazyWithRetry(() => import('./views/base/placeholders/Placeholders'))
const Popovers = lazyWithRetry(() => import('./views/base/popovers/Popovers'))
const Progress = lazyWithRetry(() => import('./views/base/progress/Progress'))
const Spinners = lazyWithRetry(() => import('./views/base/spinners/Spinners'))
const Tables = lazyWithRetry(() => import('./views/base/tables/Tables'))
const Tooltips = lazyWithRetry(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = lazyWithRetry(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = lazyWithRetry(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = lazyWithRetry(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = lazyWithRetry(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = lazyWithRetry(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = lazyWithRetry(() => import('./views/forms/form-control/FormControl'))
const InputGroup = lazyWithRetry(() => import('./views/forms/input-group/InputGroup'))
const Layout = lazyWithRetry(() => import('./views/forms/layout/Layout'))
const Range = lazyWithRetry(() => import('./views/forms/range/Range'))
const Select = lazyWithRetry(() => import('./views/forms/select/Select'))
const Validation = lazyWithRetry(() => import('./views/forms/validation/Validation'))

const Charts = lazyWithRetry(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = lazyWithRetry(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = lazyWithRetry(() => import('./views/icons/flags/Flags'))
const Brands = lazyWithRetry(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = lazyWithRetry(() => import('./views/notifications/alerts/Alerts'))
const Badges = lazyWithRetry(() => import('./views/notifications/badges/Badges'))
const Modals = lazyWithRetry(() => import('./views/notifications/modals/Modals'))
const Toasts = lazyWithRetry(() => import('./views/notifications/toasts/Toasts'))

const Widgets = lazyWithRetry(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },

  // Employe path def
  { path: '/employees', name: 'Employés', element: ListEmployes, exact: true },
  { path: '/employees/list', name: 'List', element: ListEmployes, exact: true },
  { path: '/employees/ajout', name: 'Ajout', element: AjoutEmploye, exact: true },
  {
    path: '/employees/fiche/:id',
    name: 'Fiche',
    element: FicheEmploye,
    exact: true,
  },
  {
    path: '/employees/fiche/:id/:activeTabParam',
    name: 'Fiche',
    element: FicheEmploye,
    exact: true,
  },
  {
    path: '/etatDivers/cnaps',
    name: 'Déclaration CNAPS',
    element: DeclarationCnaps,
    exact: true,
  },

  // Gestion de paie path def
  {
    path: '/gestion-de-paie',
    name: 'Liste employée (Gestion de paie)',
    element: GestionPaie,
    exact: true,
  },
  {
    path: '/gestion-de-paie/historique/:id',
    name: 'Historique',
    element: HistoriquePaie,
    exact: true,
  },
  {
    path: '/gestion-de-paie/historique/:id/valider/:dateValidation',
    element: ValidePaie,
    name: 'Validation paie',
    exact: true,
  },
  {
    path: '/gestion-de-paie/historique/:id/details/:idValidation',
    name: 'Détail sur la paie',
    element: DetailPaieValide,
    exact: true,
  },
  {
    path: '/gestion-de-paie/historique/:id/details/:idValidation/imprimer',
    name: 'Bulletin de paie',
    element: BulletinPaie,
    exact: true,
  },

  // Administration path def
  {
    path: '/admin/import-heures',
    name: 'Importer heures',
    element: ImportHeures,
    exact: true,
  },

  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  {
    path: '/buttons/button-groups',
    name: 'Button Groups',
    element: ButtonGroups,
  },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  {
    path: '/forms/checks-radios',
    name: 'Checks & Radios',
    element: ChecksRadios,
  },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  {
    path: '/forms/floating-labels',
    name: 'Floating Labels',
    element: FloatingLabels,
  },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  {
    path: '/notifications',
    name: 'Notifications',
    element: Alerts,
    exact: true,
  },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
