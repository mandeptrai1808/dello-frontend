import React from "react";
import { FacebookFilled, YoutubeFilled } from "@ant-design/icons";
export default function About() {
  return (
    <div
      className="flex justify-center"
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/originals/60/cb/46/60cb4600ad2427938722b77faba6426a.png)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="w-2/3 h-screen p-5">
        <div className="flex align-middle border-b pb-5">
          <div
            style={{
              backgroundImage:
                "url(https://animecorner.me/wp-content/uploads/2022/05/Spy-x-family-06-31.png)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-44 h-44 rounded-full"
          ></div>
          <div className="ml-20 text-center pt-10 text-white">
            <p className="text-6xl m-0">NGUYỄN VĂN MẶN</p>
            <p className="text-2xl m-0">{"(Thợ săn bọ hết thời)"}</p>
          </div>
        </div>

        <div className="pt-5 border-b">
          <p className="text-xl text-slate-200 ">
            DELLO là một dự án cá nhân của tôi, được clone dựa theo ứng dụng nổi
            tiếng TRELLO - một nền tảng quản lý và lên kế hoạch công việc. Là dự
            án đầu tay trong lĩnh vực website, tất nhiên sẽ không tránh được
            những sai sót, mong mọi người thông cảm. Tôi rất biết ơn nếu nhận
            được những ý kiến phản hồi về dự án này, cũng như những vấn đề mọi
            người gặp phải để tôi có thể khắc phục sớm nhất. Xin cảm ơn, chúc
            một người có giây phút làm việc hiệu quả!
          </p>
        </div>

        <div className="text-center mt-5">
          <p className="text-2xl text-white m-0">Liên lạc với tôi: </p>
          <div className="text-5xl">
            <a href="https://www.facebook.com/vanmancoder/">
              <FacebookFilled
                className="mr-5 hover:scale-125 duration-200"
                style={{ color: "#E9EBEE" }}
              />
            </a>
            <a href="https://www.youtube.com/channel/UChQQrKebGv_3Cy31KzEjDpg">
              <YoutubeFilled className="mr-2 scale-125 hover:scale-150 duration-200" style={{ color: "#EA4335" }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
