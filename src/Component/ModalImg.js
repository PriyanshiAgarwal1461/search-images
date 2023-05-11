import Modal from "antd/es/modal/Modal"
export const ModalImg = ({ isModalOpen, setIsModalOpen, imgUrl, setImgUrl }) => {

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal title="" open={isModalOpen} onCancel={handleCancel} footer={null}>
            <div>
                <img
                    src={imgUrl}
                    alt=""
                    width="450px"
                    height="450px"
                />
            </div>

        </Modal>
    )

}