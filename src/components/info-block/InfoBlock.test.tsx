import { render, screen } from '@testing-library/react'
import InfoBlock from './InfoBlock'

const mockProps = {
  title: 'Some title',
  description: 'Some description',
  version: '1.0.0',
  license: 'Some license',
}

describe('InfoBlock component', () => {
  it('should render the title', () => {
    render(<InfoBlock {...mockProps} />)

    const title = screen.getByRole('heading')
    expect(title).toHaveTextContent('Some title')
  })

  it('should render the description', () => {
    render(<InfoBlock {...mockProps} />)

    const description = screen.getByText('Some description')
    expect(description).toBeInTheDocument()
  })

  it('should render the version info', () => {
    render(<InfoBlock {...mockProps} />)

    const version = screen.getByText('version: 1.0.0')
    expect(version).toBeInTheDocument()
  })

  it('should render the license info', () => {
    render(<InfoBlock {...mockProps} />)

    const license = screen.getByText('license: Some license')
    expect(license).toBeInTheDocument()
  })
})
