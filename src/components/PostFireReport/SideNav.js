import logo from '../../images/PRMTS-logo.png'

const index = () => {
    return (
        <>
            <div className='logo'>
                <img 
                    src={ logo }
                    className='img-fluid img-thumbnail logo border-0'
                    alt='PRMTS Logo'
                /> 
            </div>
        </>
    )
}

export default index;
