import { render, screen  } from "@testing-library/react"
import Header from "../components/header/Header";
import '@testing-library/jest-dom'

describe('Header Component',()=>{

    test('El Logo del brand se encuentra en el header',()=>{
        render(<Header/>);
        const img = screen.getByRole('img', { name : 'brand'});
        expect(img).toBeInTheDocument();
    })

})