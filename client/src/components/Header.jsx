import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
           <img src="/eye.png" alt="Eye icon" style={{ width: '40px', height: '40px', marginRight:'5px' }} />

      <h1 className="header-title">
        Dear Future
      </h1>
    </header>
  );
}

export default Header;
