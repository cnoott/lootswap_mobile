# LootSwap

# M1 Mac Setup Instructions for running on iOS simulator
(Set up is different for M1 arch)

1. Deintegrate pod files
```bash
cd ./ios
pod deintegrate
```

2. Re-install pod files using Rosetta
```bash
arch -x86_64 pod install
```

3. Build and run in sumilator
```bash
npx react-native run-ios --simulator "iPhone 14 Pro Max"
```

# Normal Project Setup
1. Clone the repo(https://github.com/cnoott/lootswap_mobile.git)
2. cd lootswap_mobile (Come inside app root folder)
3. On terminal, run `yarn install` or `yarn`, It will install node modules
4. Install Pods, run `cd ios` & then `pod install`
5. Start a Server -> `cd ..` && `yarn start`

# Run Specific Environment(iOS)
We have 2 environment -> 1) Production 2) Development
(All run commands are specified in package.json file)

1. To Run Production Environemnt, run -> `yarn ios:prod`
2. To Run Development Environemnt, run -> `yarn ios:dev`

# Run Specific Environment(android)
We have 2 environment -> 1) Production 2) Development
(All run commands are specified in package.json file)

1. To Run Production Environemnt, run -> `yarn android:prod`
2. To Run Development Environemnt, run -> `yarn android:dev`

# Change in Specific environment file
If you want to change any environment variable like changing `APP_URL` or need to add New one then you have to make changes in environment specific files

1. To Chnage Development Config -> Make changes in `.env.development` file on root folder
2. To Chnage Production Config -> Make changes in `.env.production` file on root folder
When you will run project then this files content will automatically replaced in `.env` file.
