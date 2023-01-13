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
