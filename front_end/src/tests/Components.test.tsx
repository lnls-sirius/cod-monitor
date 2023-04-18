import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { version } from "../assets/constants/text";
import Footer from '../components/Structure/Footer';
import Info from '../components/Structure/Info';
import Navigator from "../components/Structure/Navigator";

describe('Navigation', () => {
  it("Component renders", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Navigator/>
        </BrowserRouter>
      );
    });

    const nav1 = screen.getByText(/BPM Drift/i);
    expect(nav1).toBeInTheDocument();

    const nav2 = screen.getByText(/Orbit Drift/i);
    expect(nav2).toBeInTheDocument();
  })
})

describe('Info', () => {
  it("BPM Info renders", async () => {
    await act(async () => {
      render(
        <Info type="BPM"/>
      );
    });

    const page_info = screen.getByText(/position of a BPM relative to a selected date/i);
    expect(page_info).toBeInTheDocument();

    const headers = [
      'Date Modification',
      'BPM Selection',
      'Chart Interaction'
    ]
    for(let id=0; id<3; id++){
      const nav2 = screen.getByText(headers[id]);
      expect(nav2).toBeInTheDocument();
    }
  })

  it("Orbit Info renders", async () => {
    await act(async () => {
      render(
        <Info type="Orbit"/>
      );
    });

    const page_info = screen.getByText(/disturbed closed orbits/i);
    expect(page_info).toBeInTheDocument();

    const headers = [
      'Date Modification',
      'Signature Information',
      'Chart Interaction'
    ]
    for(let id=0; id<3; id++){
      const nav2 = screen.getByText(headers[id]);
      expect(nav2).toBeInTheDocument();
    }
  })

  it("Footer renders", async () => {
    await act(async () => {
      render(
        <Footer />
      );
    });

    const contact = screen.getByText(/contact/i);
    expect(contact).toBeInTheDocument();

    const ver = screen.getByText(version);
    expect(ver).toBeInTheDocument();
  })
})
