# SecretShare

SecretShare is an open-source, secure, and privacy-focused secret sharing service. It allows users to share sensitive information through encrypted, self-destructing messages. Inspired by the need for privacy-focused, temporary secret sharing in the digital age.

Access the hosted version online at: https://sharesecret.uk
## Features

- **End-to-end encryption**: Messages are encrypted on the client-side before transmission.
- **Zero-knowledge architecture**: We never have access to your unencrypted data.
- **One-time URLs**: Each secret gets a unique, one-time-use URL.
- **Auto-destruction**: Secrets are permanently deleted after being viewed.
- **No account required**: Share secrets without creating an account or providing personal information.
- **Open-source**: Our code is transparent and open for inspection.

## How It Works

1. Enter your secret message (encrypted instantly in your browser).
2. Receive a unique, one-time-use URL.
3. Share the URL with your intended recipient.
4. Once viewed, the secret is permanently deleted from our systems.

## Installation

To set up your own instance of SecretShare:

```bash
git clone git@github.com:Moe-Hassan-123/secretShare.git
cd secretShare
pnpm install
pnpm run build
pnpm start
```

## Usage

1. Visit https://sharesecret.uk (or http://localhost:3000 if running locally).
2. Enter your secret in the provided text area.
3. Click "Generate Link".
4. Copy the generated URL and share it with your intended recipient.

## Contributing

We welcome contributions from the community! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## Security

If you discover a security vulnerability within SecretShare, please send an e-mail to security@secretshare.com. All security vulnerabilities will be promptly addressed.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
