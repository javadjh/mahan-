/*در این قسمت داده های سامانه مقدار دهی میشوند و سامانه را برای اولین بار برای کار آماده میکند */
const fs = require("fs");
let JavaScriptObfuscator = require("javascript-obfuscator");
const AccessModel = require("../model/AccessModel");
const UserModel = require("../model/UserModel");
const FileModel = require("../model/FileModel");
const AppSettingModel = require("../model/AppSettingModel");
const RoleModel = require("../model/RoleModel");
const ArchiveModel = require("../model/ArchiveModel");
const FormModel = require("../model/FormModel");
const { genPassword } = require("../utility/passwordUtility");
const { errorResponse } = require("../utility/ResponseHandler");
module.exports = async (req, res) => {
  if (await AccessModel.findOne()) return res.send("<h1>initialized</h1>");
  //ثبت اولیه تنظیمات برنامه

  const http = require("http");
  let postData = JSON.stringify({ license: req.params.id });

  const options = {
    hostname: "87.236.215.49",
    port: 9000,
    path: "/api/v1/use/license",
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
  };

  const request = http.request(options, (res) => {
    res.setEncoding("utf8");
    res.on("data", async (chunk) => {
      if (chunk) {
        const data = JSON.parse(chunk);
        if (chunk.isUsed) return errorResponse(res, "لایسنس استفاده شده است");

        let accessUserCount = 0;
        let accessSupervisorCount = 0;
        let accessArchiveCount = 0;
        switch (data.plane) {
          case "یک":
            accessUserCount = 0;
            accessArchiveCount = 1;
            break;
          case "دو":
            accessUserCount = 2;
            accessArchiveCount = 1;
            break;
          case "سه":
            accessUserCount = 5;
            accessArchiveCount = 2;
            break;
          case "چهار":
            accessUserCount = 9;
            accessArchiveCount = 3;
            break;
          case "پنج":
            accessUserCount = 9;
            accessArchiveCount = 4;
            break;
          case "شش":
            accessUserCount = 100;
            accessArchiveCount = 100;
            break;
        }

        console.log({
          accessUserCount,
          accessSupervisorCount,
          accessArchiveCount,
        });

        await new AppSettingModel({
          mailHost: "mail.nahalara.co",
          mailPort: 465,
          mailUser: "info@nahalara.co",
          mailPassword: "info147852369",
          mail: "info@nahalara.co",
        }).save();
        //دسترسی ها اضافه میشوند
        await AccessModel.insertMany([
          {
            _id: "61e3caf7d6d14316ac387bb6",
            title: "کازیو",
            description: "کاربر میتواند کازیو در پرونده اضافه کند ",
            group: "عمومی",
            __v: 0,
          },
          {
            _id: "61e3caf7d6d14316ac387bb7",
            title: "کاربران",
            description: "دسترسی مدیریت کاربران (نمایش و ویرایش) فعال می شود ",
            group: "مدیریتی",
            __v: 0,
          },
          {
            _id: "61e3caf7d6d14316ac387bb8",
            title: "تعریف کاربر",
            description: "دسترسی ثبت کاربر جدید فعال می گردد",
            group: "مدیریتی",
            __v: 0,
          },
          {
            _id: "61e3caf7d6d14316ac387bb9",
            title: "انتصاب کاربران به بایگانی",
            description:
              "انتخاب بایگانی برای کاربر از این دسترسی میتوانید کمک بگیرید",
            group: "بایگانی",
            __v: 0,
          },
          {
            _id: "61e3caf7d6d14316ac387bba",
            title: "تاریخچه تغییرات",
            description:
              "لاگ های سامانه را به کاربر نمایش می دهد(هشدار : تمام اطلاعات سامانه ممکن است در اختیار کاربر قرار بگیرد)",
            group: "مدیریتی",
            __v: 0,
          },
          {
            _id: "61e3caf7d6d14316ac387bbb",
            title: "الگوی کد گذاری",
            description:
              "دسترسی تعریف ساختار شماره گذاری پرونده ها فعال می شود",
            group: "مدیریتی",
            __v: 0,
          },
          {
            _id: "61e3caf7d6d14316ac387bbc",
            title: "الگوی دسترسی",
            description:
              "دسترسی ایجاد ، حذف و ویرایش نقش ها و اعمال سطوح دسترسی  آنها داده شود.",
            group: "مدیریتی",
            __v: 0,
          },
          {
            _id: "61e3caf7d6d14316ac387bbd",
            title: "ایجاد سند",
            description:
              "کاربر میتواند سند ایحاد کند و در بایگانی قرار دهد(قابلیت ایجاد پرونده را ندارد)",
            group: "سند",
            __v: 0,
          },
          {
            _id: "61e3caf7d6d14316ac387bbe",
            title: "ویرایش پرونده",
            description: "دسترسی افزودن و ویرایش پرونده فعال گردد",
            group: "پرونده",
            __v: 0,
          },
          {
            _id: "61e3caf7d6d14316ac387bbf",
            title: "ویرایش سند",
            description:
              "قابلیت ویرایش سند را به کاربر میدهد ولی به صورت ورژن بندی ذخیره میشود",
            group: "سند",
            __v: 0,
          },
          {
            _id: "61e3caf7d6d14316ac387bc0",
            title: "جستجوی پیشرفته اسناد",
            description: "دسترسی به جستجو پیشرفته سامانه را در اختیار میگیرد",
            group: "سند",
            __v: 0,
          },
          {
            _id: "61e3caf7d6d14316ac387bc1",
            title: "تاریخچه تغییرات سند",
            description: "ورژن بندی را میتواند تماشا کند",
            group: "سند",
            __v: 0,
          },
          {
            _id: "61e3caf7d6d14316ac387bc2",
            title: "حذف سند",
            description: "کاربر صرفا می تواند اسناد درون پروند را حذف نماید",
            group: "سند",
            __v: 0,
          },
          {
            _id: "61e3caf7d6d14316ac387bc3",
            title: "مخاطبین پرونده",
            description: "میتواند به پرونده مخاطب معرفی کند",
            group: "پرونده",
            __v: 0,
          },
          {
            _id: "61e3caf7d6d14316ac387bc4",
            title: "افزودن فرم",
            description:
              "دسترسی مدیریت فرم ساز  و ساخت فرم روکش پرونده به کاربر داده شود",
            group: "مدیریتی",
            __v: 0,
          },
          {
            _id: "61e3caf7d6d14316ac387bc5",
            title: "انتخاب فرم برای بایگانی",
            description: "انتخاب یک فرم(روکش) مشخص برای یک بایگانی",
            group: "بایگانی",
            __v: 0,
          },
          {
            _id: "61e3caf7d6d14316ac387bc6",
            title: "گزارش گیری",
            description: "میتواند گزارش های سامانه را تماشا کند",
            group: "مدیریتی",
            __v: 0,
          },
          {
            _id: "61ea8a920ac4be3e0c304dab",
            title: "مدیریت اشخاص حقیقی",
            description: "دسترسی ثبت و مدیریت اشخاص حقیقی فعال گردد",
            group: "مدیریتی",
            __v: 0,
          },
          {
            _id: "61ea8a920ac4be3e0c304dac",
            title: "مدیریت اشخاص حقوقی",
            description: "دسترسی ثبت و مدیریت اشخاص حقوقی فعال گردد",
            group: "مدیریتی",
            __v: 0,
          },
          {
            _id: "61ec5051bbf5a41ce84d90fc",
            title: "مدیریت بایگانی",
            description: "افزودن ، ویرایش و حذف بایگانی میباشد",
            group: "بایگانی",
            __v: 0,
          },
          {
            _id: "61ed21a69d89da17004e6d50",
            title: "مدیریت درخت",
            description: "افزودن ، ویرایش و حذف درخت میباشد",
            group: "بایگانی",
            __v: 0,
          },
          {
            _id: "61f65725a31fc706a0c94931",
            title: "ثبت اطلاعات تکمیلی برای بایگانی",
            description: "افزودن ، ویرایش و حذف بایگانی میباشد",
            group: "بایگانی",
            __v: 0,
          },
          {
            _id: "61ffde6120740c1ef4b9835c",
            title: "نمایش سندها",
            description: "در این بخش کاربر میتواند فهرست سند ها را مشاهده کند",
            group: "سند",
            __v: 0,
          },
          {
            _id: "620756f7bcf7572eb44bac97",
            title: "ویرایش روکش پرونده",
            description:
              "با استفاده از این دسترسی میتوانید روکش پرونده را ویرایش کنید",
            group: "پرونده",
            __v: 0,
          },
          {
            _id: "6207f91c92b59a17d4d5199d",
            title: "ایجاد بایگانی",
            description:
              "جهت افزودن و یا ویرایش و یا حذف بایگانی مورد استفاده قرار میگیرد",
            group: "بایگانی",
            __v: 0,
          },
          {
            _id: "621a0a4be8192f2084c06b01",
            title: "اشتراک گذاری",
            description: "دسترسی اشتراک گذاری اسناد و پرونده ها داده شود",
            group: "مدیریتی",
            __v: 0,
          },
          {
            _id: "6223a13e9709b61748909923",
            title: "حذف پرونده",
            description: "دسترسی حذف پرونده به نقش داده شود",
            group: "پرونده",
            __v: 0,
          },
          {
            _id: "6227b4d2b2bb4c36207bab7a",
            title: "مدیریت سمت سازمانی",
            description:
              "با استفاده از این دسترسی میتوانید سمت سازمانی را مدیریت کنید",
            group: "مدیریتی",
            __v: 0,
          },
          {
            _id: "622b329f6c2db1053c2dfc3b",
            title: "مدیریت اسناد حذف شده",
            description:
              "کاربر میتواند اسناد حذف شده را مشاهده کند و آن را بازگرداند",
            group: "سند",
            __v: 0,
          },
          {
            _id: "6235e88e0b39662ba8edc0ed",
            title: "اشتراک گذاری اسناد با ایمیل",
            description:
              "کاربر با استفاده از این دسترسی میتواند اسناد بایگانی را با ایمیل به اشتراک بگذارد",
            group: "سند",
            __v: 0,
          },
          {
            _id: "623a01a1b42fb709ccedf5e8",
            title: "مشاهده قفسه ها",
            description:
              "با استفاده از این دسترسی میتوانید به قفسه های یک بایگانی دسترسی پیدا کنید",
            group: "بایگانی",
            __v: 0,
          },
          {
            _id: "623b1c34fc1d1421f0f006b3",
            title: "ناظر",
            description: "ناظر میتواند پرونده را تایید کند",
            group: "مدیریتی",
            __v: 0,
          },
          {
            _id: "623b60aa38d6870b90d8627e",
            title: "مدیریت اطلاعات پایه",
            description:
              "مدیریت اطلاعات پایه ، سامانه اسناد ماهان به نقش داده شود",
            group: "مدیریتی",
            __v: 0,
          },
          {
            _id: "632f4571cbd43b36244e37a3",
            title: "دریافت سند",
            description: "دریافت سند(دانلود)",
            group: "سند",
            __v: 0,
          },
        ]);

        await new RoleModel({
          _id: "61e3f4bded6fe60d48d0a979",
          accessList: [
            "61e3caf7d6d14316ac387bb9",
            "61e3caf7d6d14316ac387bc5",
            "61ed21a69d89da17004e6d50",
            "61f65725a31fc706a0c94931",
            "623a01a1b42fb709ccedf5e8",
            "623b1c34fc1d1421f0f006b3",
            "61e3caf7d6d14316ac387bbd",
            "61e3caf7d6d14316ac387bbf",
            "61e3caf7d6d14316ac387bc0",
            "61e3caf7d6d14316ac387bc1",
            "61e3caf7d6d14316ac387bc2",
            "61ffde6120740c1ef4b9835c",
            "622b329f6c2db1053c2dfc3b",
            "6235e88e0b39662ba8edc0ed",
            "61e3caf7d6d14316ac387bb6",
            "61e3caf7d6d14316ac387bb7",
            "61e3caf7d6d14316ac387bb8",
            "61e3caf7d6d14316ac387bba",
            "61e3caf7d6d14316ac387bbb",
            "61e3caf7d6d14316ac387bbc",
            "61e3caf7d6d14316ac387bc4",
            "61e3caf7d6d14316ac387bc6",
            "61ea8a920ac4be3e0c304dab",
            "61ea8a920ac4be3e0c304dac",
            "621a0a4be8192f2084c06b01",
            "6227b4d2b2bb4c36207bab7a",
            "623b60aa38d6870b90d8627e",
            "61e3caf7d6d14316ac387bbe",
            "61e3caf7d6d14316ac387bc3",
            "620756f7bcf7572eb44bac97",
            "6223a13e9709b61748909923",
            "632f4571cbd43b36244e37a3",
          ],
          title: "مدیر کل سامانه",
          description:
            "توضیحات نقش در این قسمت نمایش داده می شود و میتواندی توضیحات لازم را بنویسید",
        }).save();
        await new RoleModel({
          _id: "62644bb1f1463f0684e5a0ba",
          accessList: [
            "61e3caf7d6d14316ac387bb9",
            "61e3caf7d6d14316ac387bc5",
            "61ec5051bbf5a41ce84d90fc",
            "61ed21a69d89da17004e6d50",
            "61f65725a31fc706a0c94931",
            "6207f91c92b59a17d4d5199d",
            "623a01a1b42fb709ccedf5e8",
            "61e3caf7d6d14316ac387bbd",
            "61e3caf7d6d14316ac387bbf",
            "61e3caf7d6d14316ac387bc0",
            "61e3caf7d6d14316ac387bc1",
            "61e3caf7d6d14316ac387bc2",
            "61ffde6120740c1ef4b9835c",
            "623b1c34fc1d1421f0f006b3",
            "622b329f6c2db1053c2dfc3b",
            "6235e88e0b39662ba8edc0ed",
            "61e3caf7d6d14316ac387bb6",
            "61e3caf7d6d14316ac387bb7",
            "61e3caf7d6d14316ac387bb8",
            "61e3caf7d6d14316ac387bba",
            "61e3caf7d6d14316ac387bbb",
            "61e3caf7d6d14316ac387bbc",
            "61e3caf7d6d14316ac387bc4",
            "61e3caf7d6d14316ac387bc6",
            "61ea8a920ac4be3e0c304dab",
            "61ea8a920ac4be3e0c304dac",
            "621a0a4be8192f2084c06b01",
            "6227b4d2b2bb4c36207bab7a",
            "623b60aa38d6870b90d8627e",
            "61e3caf7d6d14316ac387bbe",
            "61e3caf7d6d14316ac387bc3",
            "620756f7bcf7572eb44bac97",
            "6223a13e9709b61748909923",
            "632f4571cbd43b36244e37a3",
          ],
          title: "توسعه دهنده",
          description: "این نقش برای توسعه دهنده قرارداده شده است",
        }).save();

        //افزودن مدیر کل
        let password = await genPassword("Admin5151");
        let devPassword = await genPassword("NDNMqSG#eT#aJ4_@6$$y_86nLN?*^H");
        await new UserModel({
          _id: "61e3f77540129135ec4d928f",
          firstName: "مدیر",
          lastName: "سامانه",
          phoneNumber: "09000000000",
          userName: "admin",
          password,
          roleId: "61e3f4bded6fe60d48d0a979",
          position: "مدیر سامانه",
          email: "hojati.jh@gmail.com",
        }).save();

        //افزودن توسعه دهنده برای مدیریت بایگانی ها
        let devPassword1 = await genPassword("NDNMqSG#eT#aJ4_@6$$y_86nLN?*^H");
        await new UserModel({
          _id: "626451c2ce31af260c2238be",
          firstName: "system",
          lastName: "developer",
          phoneNumber: "09165000126",
          userName: "dev",
          password: devPassword1,
          roleId: "62644bb1f1463f0684e5a0ba",
          position: "توسعه دهنده",
          email: "hojati.jh@gmail.com",
        }).save();

        await new FormModel({
          _id: "6267ec8d8d07e62f4022d6e4",
          isActive: true,
          title: "فرم خالی",
          description: "توضیحات فرم خالی",
          children: [
            {
              values: [],
              _id: "6267ec8d8d07e62f4022d6e5",
              sortNumber: 1,
              uiId: "07626373-7c96-45ba-b5dc-846a8683c221",
              type: "input",
              isRequired: true,
              label: "عنوان متن",
              min: 2,
              max: 20,
            },
          ],
          creator: "626451c2ce31af260c2238be",
          createDate: "2022-04-26T12:58:53.149+0000",
          __v: 0,
        }).save();

        const developer = await UserModel.findById("626451c2ce31af260c2238be");
        const admin = await UserModel.findById("61e3f77540129135ec4d928f");

        let newArchive = await new ArchiveModel({
          ...{
            title: "بایگانی پیش فرض",
            description: "این بایگانی به صورت پیش فرض ساخته می شود",
          },
          ...{ creator: "626451c2ce31af260c2238be" },
        });

        newArchive = await newArchive.save();

        developer.role.push({
          _id: "626451c2ce31af260c2238be",
          archiveId: newArchive._id,
          archiveTitle: newArchive.title,
          roleTitle: "توسعه دهنده",
          roleId: "62644bb1f1463f0684e5a0ba",
          fileAccess: ["عادی", "محرمانه", "به کل محرمانه"],
        });
        admin.role.push({
          _id: "61e3f77540129135ec4d928f",
          archiveId: newArchive._id,
          archiveTitle: newArchive.title,
          roleTitle: "مدیر کل سامانه",
          roleId: "61e3f4bded6fe60d48d0a979",
          fileAccess: ["عادی", "محرمانه", "به کل محرمانه"],
        });
        await developer.save();
        await admin.save();

        let accessCount = JavaScriptObfuscator.obfuscate(`
                    module.exports.accessUserCount = ${accessUserCount}
                    module.exports.accessSupervisorCount = ${accessSupervisorCount}
                    module.exports.accessArchiveCount = ${accessArchiveCount}
                `);

        console.log(accessCount.getObfuscatedCode());

        await fs.writeFileSync(
          "./handler/AccessCount.js",
          accessCount.getObfuscatedCode()
        );
      }
      console.log(`BODY: ${chunk}`);
    });
    res.on("end", () => {
      console.log("No more data in response.");
    });
  });

  request.on("error", (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  // write data to request body
  request.write(postData);
  request.end();

  res.send(true);
};
