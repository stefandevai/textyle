import Tool from 'ui/toolbar/Tool';

const Toolbar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <a role='button' className='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='toolbar'>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>

      <div id='toolbar' className='navbar-menu'>
        <div className='navbar-start'>
          <a className='navbar-item'>
            <Tool name='T1' />
          </a>
          <a className='navbar-item'>
            <Tool name='T2' />
          </a>
          <a className='navbar-item'>
            <Tool name='T3' />
          </a>
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            <button href='#' className='button is-primary'>
              <strong>Export</strong>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Toolbar;

