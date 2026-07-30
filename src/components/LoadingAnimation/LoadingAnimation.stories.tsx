import type { Meta, StoryObj } from '@storybook/react-vite';

import LoadingOverlay from '../LoadingOverlay';

import LoadingAnimation from './LoadingAnimation';

const meta = {
  title: 'GlamUI/LoadingAnimation',
  component: LoadingAnimation,
} satisfies Meta<typeof LoadingAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'LoadingAnimation Label',
  },
};

export const PageOverlay: Story = {
  args: {
    label: 'Loading your GlamVault',
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (
    <div
      style={{
        minHeight: '100vh',
        padding: 32,
        background: '#fff7fc',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: 960,
          minHeight: 540,
          margin: '0 auto',
          overflow: 'hidden',
          border: '1px solid #f0dce9',
          borderRadius: 24,
          background: '#ffffff',
          boxShadow: '0 20px 60px rgba(84, 40, 70, 0.12)',
        }}
      >
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '22px 28px',
            borderBottom: '1px solid #f3e7ef',
          }}
        >
          <strong style={{ color: '#f23bb5', fontSize: 28 }}>GlamVault</strong>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: '#f8d9ed',
            }}
          />
        </header>

        <main style={{ display: 'flex', minHeight: 455 }}>
          <aside
            style={{
              width: 190,
              padding: 24,
              borderRight: '1px solid #f3e7ef',
              background: '#fffafd',
            }}
          >
            {['Dashboard', 'Inventory', 'Wishlist', 'Collections'].map(
              (item, index) => (
                <div
                  key={item}
                  style={{
                    marginBottom: 12,
                    padding: '11px 14px',
                    borderRadius: 10,
                    color: index === 0 ? '#ffffff' : '#685a64',
                    background: index === 0 ? '#f23bb5' : 'transparent',
                    fontWeight: 600,
                  }}
                >
                  {item}
                </div>
              ),
            )}
          </aside>

          <section style={{ flex: 1, padding: 32 }}>
            <h1 style={{ margin: 0, color: '#241c22', fontSize: 30 }}>
              Welcome back
            </h1>
            <p style={{ margin: '8px 0 28px', color: '#80737c' }}>
              Here is a quick look at your beauty collection.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 18,
              }}
            >
              {[
                ['Inventory', '42 items'],
                ['Wishlist', '12 items'],
                ['Collections', '6 groups'],
              ].map(([title, value]) => (
                <article
                  key={title}
                  style={{
                    padding: 22,
                    border: '1px solid #f1dce9',
                    borderRadius: 16,
                    background: '#fffafd',
                  }}
                >
                  <div style={{ color: '#8b7885', fontSize: 14 }}>{title}</div>
                  <strong
                    style={{
                      display: 'block',
                      marginTop: 10,
                      color: '#33262f',
                      fontSize: 24,
                    }}
                  >
                    {value}
                  </strong>
                </article>
              ))}
            </div>

            <div
              style={{
                height: 180,
                marginTop: 24,
                borderRadius: 18,
                background: 'linear-gradient(135deg, #fff0f8 0%, #f4ecff 100%)',
              }}
            />
          </section>
        </main>

        <LoadingOverlay label={args.label} fullScreen={false} />
      </div>
    </div>
  ),
};
