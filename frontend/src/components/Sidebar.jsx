import logo from '../../assets/Logo-GSO3.png'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="GSO Köln Marketplace" />
      </div>

      <nav>
        <a className="active">Dashboard</a>
      </nav>
    </aside>
  );
}