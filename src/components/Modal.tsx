import CustomChartJS from "./CustomChartJS";
import { ModalValueInterface } from "./table/TableBody";

function Modal({
  chartData,
  icon,
}: {
  chartData: ModalValueInterface;
  icon: any;
}) {
  const modalContainer = document.getElementById("modal-container");

  const closeModal = () => {
    modalContainer!!.classList.add("out");
    document.body.classList.remove("modal-active");
  };

  return (
    <div id="modal-container" onClick={closeModal}>
      <div className="modal-background">
        <div className="modal">
          {/*content*/}
          <div className="x relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-center rounded-t border-b border-solid border-slate-200 p-5">
              <img src={icon} width={40} alt="Crypto icon" className="mr-2" />
              <h3 className="text-3xl font-semibold">
                {chartData.dataset.label}
              </h3>
            </div>
            {/*body*/}
            <div className="relative flex-auto p-6">
              <div className="x">
                <CustomChartJS
                  labels={chartData.labels}
                  datasets={[chartData.dataset]}
                  config={{
                    type: "line",
                    scale: "logarithmic",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
