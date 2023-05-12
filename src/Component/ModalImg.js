import Modal from "antd/es/modal/Modal"
export const ModalImg = ({ isModalOpen, setIsModalOpen, imgUrl, setImgUrl }) => {

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal title="" open={isModalOpen} onCancel={handleCancel} footer={null}>
            <div className="abc">
                <img
                    src={imgUrl}
                    alt=""
                    width="100%"
                    height="100%"
                />
            </div>

        </Modal>
    )

}