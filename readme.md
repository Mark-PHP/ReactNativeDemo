## init
`npm install`

## Android配置
### apk显示在桌面的名字
`./android/app/src/main/res/values/strings.xml`

### logo更改
`./android/app/src/main/res/drawable/icai.png`

### 打包
#### 参考
- [打包APK](https://reactnative.cn/docs/0.51/signed-apk-android.html#content)

#### 生成秘钥
```bash
cd /Library/Java/JavaVirtualMachines/jdk1.8.0_171.jdk/Contents/Home/bin
sudo keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
再次输入新口令: superman
您的名字与姓氏是什么?
  [Unknown]:  Mark
您的组织单位名称是什么?
  [Unknown]:  Mark
您的组织名称是什么?
  [Unknown]:  Mark
您所在的城市或区域名称是什么?
  [Unknown]:  Mark
您所在的省/市/自治区名称是什么?
  [Unknown]:  Mark
该单位的双字母国家/地区代码是什么?
  [Unknown]:  Mark
```

#### 配置秘钥

```bash
# vim ~/.gradle/gradle.properties
MYAPP_RELEASE_STORE_FILE=app/my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=superman
MYAPP_RELEASE_KEY_PASSWORD=superman
```

```bash
# vim android/app/build.gradle
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

#### 打包
```bash
cd android
./gradlew clean && ./gradlew aR
```
编译后的apk包位于
./app/build/outputs/apk

### 安装/卸载apk
```bash
#安装
adb install -r ./app/build/outputs/apk/app-release.apk
```
