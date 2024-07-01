# lootswap mobile

# M1 Mac Setup Instructions for running on iOS simulator
(Set up is different for M1 arch)

1. Deintegrate pod files
```bash
cd ./ios
pod deintegrate
```

2. Install Packages
```bash
npm install --legacy-peer-deps && yarn install
```

3. Re-install pod files using Rosetta
```bash
arch -x86_64 pod install
```

4. Build and run in sumilator
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

You can also run from xcode directly by changing schema & run

![ScreenShot](https://i.postimg.cc/k43tjWpg/Screenshot-2023-02-21-at-2-59-18-PM.png)

# Run Specific Environment(android)
We have 2 environment -> 1) Production 2) Development
(All run commands are specified in package.json file)
1. To Run Production Environemnt, run -> `yarn android:prod`
2. To Run Development Environemnt, run -> `yarn android:dev`

You can also run from androis studio directly by changing build varient

![ScreenShot](https://i.postimg.cc/XvzXhd1C/Screenshot-2023-02-21-at-3-11-24-PM.png)

# Change in Specific environment file
If you want to change any environment variable like changing `APP_URL` or need to add New one then you have to make changes in environment specific files

1. To Chnage Development Config -> Make changes in `.env.development` file on root folder
2. To Chnage Production Config -> Make changes in `.env.production` file on root folder
When you will run project then this files content will automatically replaced in `.env` file.


# Troubleshooting Dev Environemnt Setup:
- If you change env variables and it doesnt update when you run dev, try the following
  1. `yarn cache clean`
  2. `yarn start --reset-cache`
  3. Clean build on Xcode
  4. Close Simulator
  5. Run on Xcode

# Version Naming Standard
We use the versioning standard of 'a.b.c.' where
a is for major updates
b is for feature updates
c is for minor fixes/changes

# Handling OTA (Over the Air) and AppStore updates.
Some updates (such as native code changes or package installs) must be manually updated through the AppStore.
*Its important to make sure that the user has the correct base version of the app in order to recieve a certain OTA update*

## Performing a AppStore update
1. Change Info.plist to reflect the new version number.
2. Go the the backend to match that number.
3. Make sure the Project selected at the top is "lootswap_mobile"
4. Do clean build witha "Any IOS Device (arm64) target
5. Select Project > Archive > Distribute App
6. Go to AppStore connect and submit new version for verification

## Performing OTA Update via CodePush CLI
** Make Sure that you are on a production environment when pushing new version **
1. Do a production build on Xcode.
2. Release new version to product making sure that MINIMUM_BASE_VERSION matches what is currently in the Info.plist

`appcenter codepush release-react -a liamaamadio/lootswap-ios -d Production --target-binary-version ">=MINIMUM_BASE_VERSION < MAX_VERSION" --mandatory true`

3. After releasing a CodePush OTA update, you now can do an AppStore update so that new users dont have to. We group these versions together.
For example, version 2.6.4 + CodePush OTA is equivalent to AppStore version 2.4.5

We only change Info.plist version number when its a AppStore update
