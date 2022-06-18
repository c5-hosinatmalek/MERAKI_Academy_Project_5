DROP DATABASE Data_Pirates;

CREATE DATABASE Data_Pirates;

USE Data_Pirates;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE users(
    user_id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    country VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (user_id)
);

CREATE TABLE permissions(
    id INT AUTO_INCREMENT NOT NULL,
    permission VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE roles_permissions(
    id INT AUTO_INCREMENT NOT NULL,
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE categories(
    category_id INT AUTO_INCREMENT NOT NULL,
    category VARCHAR(255),
    picUrlCat VARCHAR(255),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (category_id)
);

CREATE TABLE sub_categories(
    subCategory_id INT AUTO_INCREMENT NOT NULL,
    sub_category VARCHAR(255),
    picUrlSub VARCHAR(255),
    is_deleted TINYINT DEFAULT 0,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    PRIMARY KEY (subCategory_id)
);

CREATE TABLE Products(
    product_id INT AUTO_INCREMENT NOT NULL,
    picUrlProd VARCHAR(255),
    title VARCHAR (255),
    category_id INT,
    sub_category INT,
    product_name VARCHAR(255),
    product_type VARCHAR(255),
    buy_price INT,
    price INT,
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (sub_category) REFERENCES sub_categories(subcategory_id),
    Store_Quantity INT,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (Product_id)
);

CREATE TABLE pic(
    pic_id INT AUTO_INCREMENT NOT NULL,
    url VARCHAR(255),
    name VARCHAR(255),
    product_Id int,
    FOREIGN KEY (product_id) REFERENCES products(Product_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (pic_id)
);

CREATE TABLE sold(
    sold_id INT AUTO_INCREMENT NOT NULL,
    sold_price INT,
    title VARCHAR(255),
    price_buy INT,
    quantity INT,
    date VARCHAR(255),
    product_Id int,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    PRIMARY KEY (sold_id)
);



CREATE TABLE request (
    request_id int AUTO_INCREMENT NOT NULL,
    email VARCHAR(255),
    product_id int,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    is_deleted TINYINT DEFAULT 0,
    is_emailsend TINYINT DEFAULT 0,
    PRIMARY KEY (request_id)
);

CREATE TABLE usedproduct (
    used_product_id INT AUTO_INCREMENT NOT NULL,
    category VARCHAR(255),
    product_name VARCHAR(255),
    product_description TEXT,
    url_imj TEXT,
    asking_price INT,
    bank_account VARCHAR(255),
    admission_status TINYINT DEFAULT 0,
    is_deleted TINYINT DEFAULT 0,
    phone_number VARCHAR(255),
    user_id INT,
    FOREIGN key (user_id) REFERENCES users (user_id),
    PRIMARY KEY (used_product_id)
);
CREATE TABLE cart (
    cart_id INT AUTO_INCREMENT NOT NULL,
    product_id int,
    usedproduct_id INT,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (usedproduct_id) REFERENCES usedproduct(used_product_id),
    user_id int,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    quantity int,
    price_checkout int,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (cart_id)
);





INSERT INTO
    categories (category)
VALUES
    ("Powered By ASUS");

INSERT INTO
    categories (category)
VALUES
    ("GAMING");

INSERT INTO
    categories (category)
VALUES
    ("Printers");

INSERT INTO
    categories (category)
VALUES
    ("Software");

INSERT INTO
    sub_categories (sub_category, category_id, picUrlSub)
VALUES
    (
        "CPU & Processor",
        2,
        "http://res.cloudinary.com/halhouli/image/upload/v1654714250/p59ruoewwgm6epxupgvm.webp"
    );

INSERT INTO
    sub_categories (sub_category, category_id, picUrlSub)
VALUES
    (
        "Storage Drive",
        2,
        "http://res.cloudinary.com/halhouli/image/upload/v1654714801/goajw1pbyodbpv1ag7rm.webp"
    );

INSERT INTO
    sub_categories (sub_category, category_id, picUrlSub)
VALUES
    (
        "Laser Printer",
        3,
        "http://res.cloudinary.com/halhouli/image/upload/v1654714962/m0kxus3lensth0ndyhrm.webp"
    );

INSERT INTO
    sub_categories (sub_category, category_id, picUrlSub)
VALUES
    (
        "Memory - RAM",
        2,
        "http://res.cloudinary.com/halhouli/image/upload/v1654714437/j831zbyabgxpbp9ewq7o.webp"
    );

INSERT INTO
    sub_categories (sub_category, category_id, picUrlSub)
VALUES
    (
        "Graphic Card",
        2,
        "http://res.cloudinary.com/halhouli/image/upload/v1654714391/n92tbkz2ajlxen7mwbx7.webp"
    );

INSERT INTO
    sub_categories (sub_category, category_id, picUrlSub)
VALUES
    (
        "Power Supply",
        2,
        "http://res.cloudinary.com/halhouli/image/upload/v1654714662/jxu1q2voemu0jvzrsjtr.webp"
    );

INSERT INTO
    sub_categories (sub_category, category_id, picUrlSub)
VALUES
    (
        "Motherboard",
        2,
        "http://res.cloudinary.com/halhouli/image/upload/v1654714538/ire9vdikwfnfkmbcaa1z.webp"
    );

INSERT INTO
    sub_categories (sub_category, category_id, picUrlSub)
VALUES
    (
        "Cooling",
        2,
        "http://res.cloudinary.com/halhouli/image/upload/v1654714308/q4y3uvzyzgvooxxwppy0.webp"
    );

INSERT INTO
    sub_categories (sub_category, category_id, picUrlSub)
VALUES
    (
        "Cases",
        2,
        "http://res.cloudinary.com/halhouli/image/upload/v1654714839/edzxgldexnncd0emij0b.webp"
    );

INSERT INTO
    sub_categories (sub_category, category_id, picUrlSub)
VALUES
    (
        "Scanner",
        3,
        "http://res.cloudinary.com/halhouli/image/upload/v1654714916/gdqjnrprds7cvr2cgpy7.webp"
    );

INSERT INTO
    roles (role)
VALUES
    ("Admin");

INSERT INTO
    roles (role)
VALUES
    ("User");

INSERT INTO
    Products (
        picUrlProd,
        title,
        category_id,
        sub_category,
        product_type,
        price,
        description,
        Store_Quantity,
        buy_price
    )
VALUES
    (
        'http://res.cloudinary.com/doxxh3kej/image/upload/v1654159311/t7ldyjgrus0wqhqe4pns.jpg',
        'Cooler Master Hyper 212 LED Turbo CPU Cooler - White Edition',
        2,
        8,
        "cooler master",
        50,
        "Pearl White finish for a more refined look,4 direct contact heat pipes provide excellent heat dissipation,
Dual XtraFlo PWM Fans with white LEDs can be fine-tuned for maximum cooling performance or silent operation,Precise stacked fin array decreases airflow resistance, allowing cooler air to reach the heatsink,Intuitive fan bracket design makes upgrading and removing the fan a breeze,",
        70,
        40
    );

INSERT INTO
    Products (
        picUrlProd,
        title,
        category_id,
        sub_category,
        product_type,
        price,
        description,
        Store_Quantity
       
    )
VALUES
    (
        'http://res.cloudinary.com/doxxh3kej/image/upload/v1654172540/bzr4ldncgew79kdi6o4k.jpg',
        'Cooler Master MasterAir MA610P ARGB CPU Air Cooler',
        2,
        8,
        "DEEP COOL",
        55,
        "Cooler Master MasterAir MA610P is designed for gamers and overclockers who demand ultra-low temperatures, aggressive Addressable RGB lighting, and total control over their air cooling. The push and pull configuration allows high-presurre cooling,
CDC 2.0  Excellent heat dissipation with 6 heatpipes and Continuous Direct Contact 2.0 technology,
Dual SickleFlow ARGB  Push and pull - dual SickleFlow 120 ARGB fans to maximize CPU cooling with plenty of color while doing it.Unique,
Top Cover Design - Creative ARGB LED logo design with additional light strips on the top cover for aesthetic customization,
Mainstream dual platforms are available: Intel: LGA 2066/2011-v3 / 2011 /1200/ 1366/ 1156/ 1155/ 1151/ 1150/ AMD: AM4 / AM3+ / AM3 / AM2+ / AM2 / FM2+ / FM2 / FM1,",
        60
        
    );

INSERT INTO
    Products (
        picUrlProd,
        title,
        category_id,
        sub_category,
        product_type,
        price,
        description,
        Store_Quantity,
        buy_price
    )
VALUES
    (
        'https://res.cloudinary.com/doxxh3kej/image/upload/v1654173554/e5h8yv5okfpcsz8kxqzk.jpg',
        'DEEPCOOL Castle 240EX A-RGB AIO Liquid Cooler Anti-Leak Technology - White',
        2,
        8,
        "DEEP COOLER",
        80,
        "The DeepCool CASTLE 240EX A-RGB AIO liquid CPU cooler delivers fantastic RGB lighting with three DeepCool CF120 A-RGB PWM fans and our iconic infinity mirror in a 240mm radiator,
The iconic DeepCool Castle EX infinity mirror pump design with a new twist. See the new DeepCool logo on an enlarged mirror chip for a new instant classic,
Designed from the inside out, the new dual-chamber pump features an optimized flow route for better heat exchange,
A stronger 3-phase motor provides higher cooling performance with an increased flow rate while keeping noise levels low,
With 25% more skived fins on the copper cold plate, the larger surface area effectively dissipates heat,",
        30,
        50
    );

INSERT INTO
    Products (
        picUrlProd,
        title,
        category_id,
        sub_category,
        product_type,
        price,
        description,
        Store_Quantity,
        buy_price
    )
VALUES
    (
        'http://res.cloudinary.com/doxxh3kej/image/upload/v1654173765/fz9vejgkgatv2ghnxyyh.jpg',
        'DEEPCOOL CF120 Plus 3x120mm PWM A-RGB Dual Loop Lighting Zones High Airflow & Low-Noise',
        2,
        8,
        "DEEP COOLER",
        40,
        "The DeepCool CASTLE 240EX A-RGB AIO liquid CPU cooler delivers fantastic RGB lighting with three DeepCool CF120 A-RGB PWM fans and our iconic infinity mirror in a 240mm radiator,
The iconic DeepCool Castle EX infinity mirror pump design with a new twist. See the new DeepCool logo on an enlarged mirror chip for a new instant classic,
Designed from the inside out, the new dual-chamber pump features an optimized flow route for better heat exchange,
A stronger 3-phase motor provides higher cooling performance with an increased flow rate while keeping noise levels low,
With 25% more skived fins on the copper cold plate, the larger surface area effectively dissipates heat,",
        30,
        20
    );

INSERT INTO
    Products (
        picUrlProd,
        title,
        category_id,
        sub_category,
        product_type,
        price,
        description,
        Store_Quantity,
        buy_price
    )
VALUES
    (
        'http://res.cloudinary.com/doxxh3kej/image/upload/v1654173919/cda8jjedjhqkhydx7ycc.jpg',
        'Asus ROG Strix Helios GX601 RGB Mid-Tower Gaming Case',
        2,
        9,
        "ASUS",
        65,
        "Mid-tower with support for EATX motherboards featuring a metal chassis, 4mm-thick smoked, tempered-glass full view side panels, three easy-to-clean dust filters, and space for 9 Storage drives Premium cable management includes translucent rear panel, adjustable multi-function cover featuring GPU support brackets and pre-run chassis cables , Keep your cool with built in fan hub, four 140mm fans and up to seven optional fan-mounting points , Custom Liquid Cooling ready features a water pump/ reservoir mounting bracket and support for radiators up to 420mm in length and 90mm thick (with fans) , Graphic card mounting options include Up to 2x vertically mounted Graphics cards or 3x horizontally mounted Graphics cards using the 7 expansion Slots",
        30,
        55
    );

INSERT INTO
    Products (
        picUrlProd,
        title,
        category_id,
        sub_category,
        product_type,
        price,
        description,
        Store_Quantity,
        buy_price
    )
VALUES
    (
        'http://res.cloudinary.com/doxxh3kej/image/upload/v1654174248/jquiq8vgkf47k1zgwv3m.jpg',
        'ASUS TUF GT301 Honeycomb Panel Aura RBG Gaming Case',
        2,
        9,
        "ASUS",
        95,
        "Stylishly design: Perforated honeycomb front panel to aid airflow and features a tempered-glass side panel to showcase your build’s internals in the compact case,
Efficient cooling: Equipped with three 120mm Aura Sync addressable RGB-illuminated fans and one 120mm rear fan, plus up to six fan-mounting points for targeted airflow,
Space reserved for 280/360mm water-cooling radiators in front and 120mm at rear,
Integrated 6 ports Aura Sync addressable-RGB controller hub and a dedicated front panel control button to create a stunning lighting effect,
Integrated 6 ports Aura Sync addressable-RGB controller hub and a dedicated front panel control button to create a stunning lighting effect,
Extensive storage options: up to 2 HDD (trays included) and 6x SDD (2x dedicated bracket included, one is on the power supply shroud) mounting locations,
Combat-ready: Customized headphone hook which can be hanged on both sides,",
        56,
        70
    );

INSERT INTO
    Products (
        picUrlProd,
        title,
        category_id,
        sub_category,
        product_type,
        price,
        description,
        Store_Quantity,
        buy_price
    )
VALUES
    (
        'http://res.cloudinary.com/doxxh3kej/image/upload/v1654174402/w1ilj4wyikig08tgkalc.jpg',
        'AMD Ryzen™ 7 5800X3D 8-Core up to 4.6 GHz 100MB AMD 3D V-Cache™ , Tray',
        2,
        1,
        "RAYZEN",
        479,
        "The world's fastest gaming desktop processor and first gaming processor with 3D stacking technology,
8 Cores and 16 processing threads with AMD 3D V-Cache technology,
4.5 GHz Max Boost, 100 MB cache, DDR4-3200 support,
For the advanced Socket AM4 platform, can support PCIe 4.0 on X570 and B550 motherboards,
Cooler not included, high-performance cooler recommended,",
        250,
        380
    );

INSERT INTO
    Products (
        picUrlProd,
        title,
        category_id,
        sub_category,
        product_type,
        price,
        description,
        Store_Quantity,
        buy_price
    )
VALUES
    (
        'http://res.cloudinary.com/doxxh3kej/image/upload/v1654175332/iaigxe03jwpuzh9b6b2t.jpg',
        'AMD RYZEN 9 5950x 16-Core 3.4 GHz (4.9 GHz Max Boost) , Box',
        2,
        1,
        "RAYZEN",
        963,
        "The world's fastest gaming desktop processor and first gaming processor with 3D stacking technology,
8 Cores and 16 processing threads with AMD 3D V-Cache technology,
4.5 GHz Max Boost, 100 MB cache, DDR4-3200 support,
For the advanced Socket AM4 platform, can support PCIe 4.0 on X570 and B550 motherboards,
Cooler not included, high-performance cooler recommended,",
        200,
        600
    );

INSERT INTO
    Products (
        picUrlProd,
        title,
        category_id,
        sub_category,
        product_type,
        price,
        description,
        Store_Quantity,
        buy_price
    )
VALUES
    (
        'http://res.cloudinary.com/doxxh3kej/image/upload/v1654175486/rjbiqcguxtl8awz64sp1.png',
        'Intel Core i9-11900K Rocket Lake 8-Cores up to 5.3 GHz 16MB',
        2,
        1,
        "INTEL",
        1200,
        " Compatible with Intel 500 Series and Select Intel 400 Series chipset based on motherboards,
Supports Intel Turbo Boost Max Technology 3.0,
Intel Optane memory support,
PCIe Gen 4.0 compliant,
Does not include thermal solution,",
        90,
        1000
    );

INSERT INTO
    Products (
        picUrlProd,
        title,
        category_id,
        sub_category,
        product_type,
        price,
        description,
        Store_Quantity,
        buy_price
    )
VALUES
    (
        'http://res.cloudinary.com/doxxh3kej/image/upload/v1654175848/gyycwif7qvpwvwz1c0eq.jpg',
        'Intel NEW 12Gen Core i9-12900KF 16-Cores up to 5.2 GHz 44MB , Box',
        2,
        1,
        "INTEL",
        1000,
        " Intel 7 Alder Lake Processor Base Power: 125W,
Maximum Turbo Power: 241W,
30MB L3 Cache,
14MB L2 Cache,
Windows 11 Supported,",
        90,
        750
    );

INSERT INTO
    Products (
        picUrlProd,
        title,
        category_id,
        sub_category,
        product_type,
        price,
        description,
        Store_Quantity,
        buy_price
    )
VALUES
    (
        'http://res.cloudinary.com/doxxh3kej/image/upload/v1654176102/abahtzquqkd7u9rg0vaq.jpg',
        'MSI Radeon RX 6800 XT GAMING X TRIO 16G 256-Bit GDDR6',
        2,
        5,
        "AMD RADEON",
        750,
        "Video Memory: 16GB GDDR6,
Memory Interface: 256-bit,
Output: DisplayPort x 3 (v1.4) / HDMI 2.1 x 1,
Digital maximum resolution - 7680 x 4320,",
        153,
        500
    );

INSERT INTO
    Products (
        picUrlProd,
        title,
        category_id,
        sub_category,
        product_type,
        price,
        description,
        Store_Quantity,
        buy_price
    )
VALUES
    (
        'http://res.cloudinary.com/doxxh3kej/image/upload/v1654176534/jx35beqi59pvgmft5c8p.jpg',
        'ASUS ROG STRIX Radeon RX 6700 XT 12GB GDDR6 AMD RDNA 2 OC Edition',
        2,
        5,
        "AMD RADEON",
        750,
        "Axial-tech Fan Design has been enhanced with more fan blades and a new rotation scheme,
2.9-slot design expands cooling surface area compared to last gen for more thermal headroom than ever before,
Super Alloy Power II includes premium alloy chokes, solid polymer capacitors, and an array of high-current power stages,
MaxContact heat spreader allows 2X more contact with the GPU chip for improved thermal transfer,
Reinforced frame prevents excessive torsion and lateral bending of the PCB,
FanConnect II equips a hybrid-controlled fan header for optimal system cooling,
Vented backplate prevents hot air from recirculating through the cooling array,",
        153,
        500
    );

INSERT INTO
    Products (
        picUrlProd,
        title,
        category_id,
        sub_category,
        product_type,
        price,
        description,
        Store_Quantity,
        buy_price
    )
VALUES
    (
        'http://res.cloudinary.com/doxxh3kej/image/upload/v1654176681/bul0trxxmp6xucn2yxk0.jpg',
        'GeForce RTX 3070 GAMING Z TRIO 8GB 256-Bit GDDR6 LHR',
        2,
        5,
        "invida",
        850,
        "NVIDIA Ampere Streaming Multiprocessors: The all-new Ampere SM brings 2X the FP32 throughput and improved power efficiency,

2nd Generation RT Cores: Experience 2X the throughput of 1st gen RT Cores plus concurrent RT and shading for a whole new level of ray-tracing performance,
3rd Generation Tensor Cores: Get up to 2X the throughput with structural sparsity and advanced AI algorithms such as DLSS. These cores deliver a massive boost in game performance and all-new AI capabilities,
Axial-tech fan design has been newly tuned with a reversed central fan direction for less turbulence,
2.7-slot design expands cooling surface area to make the most of the three powerful Axial-tech fans,
Super Alloy Power II includes premium alloy chokes solid polymer capacitors and an array of high-current power stages,
GPU Tweak II provides intuitive performance tweaking thermal controls and system monitoring,",
        90,
        630
    );

INSERT INTO
    Products (
        picUrlProd,
        title,
        category_id,
        sub_category,
        product_type,
        price,
        description,
        Store_Quantity,
        buy_price
    )
VALUES
    (
        'http://res.cloudinary.com/doxxh3kej/image/upload/v1654177033/thadfw1ga3typkqunial.png',
        'ASUS Dual GeForce RTX 3050 8GB GDDR6 OC Edition PCI Express 4.0',
        2,
        5,
        "invida",
        850,
        "NVIDIA Ampere Streaming Multiprocessors: The all-new Ampere SM brings 2X the FP32 throughput and improved power efficiency,
2nd Generation RT Cores: Experience 2X the throughput of 1st gen RT Cores, plus concurrent RT and shading for a whole new level of ray-tracing performance,
3rd Generation Tensor Cores: Get up to 2X the throughput with structural sparsity and advanced AI algorithms such as DLSS. These cores deliver a massive boost in game performance and all-new AI capabilities,
Axial-tech fan design features a smaller fan hub that facilitates longer blades and a barrier ring that increases downward air pressure,
A 2-slot Design maximizes compatibility and cooling efficiency for superior performance in small chassis,
0dB Technology lets you enjoy light gaming in relative silence,
A stainless steel bracket is harder and more resistant to corrosion,",
        90,
        630
    );

INSERT INTO
    Products (
        picUrlProd,
        title,
        category_id,
        sub_category,
        product_type,
        price,
        description,
        Store_Quantity,
        buy_price
    )
VALUES
    (
        'http://res.cloudinary.com/doxxh3kej/image/upload/v1654177480/xpyswymfa1ek3zabtbf5.jpg',
        'ASRock Phantom Gaming Z490 PG Velocita Intel Motherboard',
        2,
        7,
        "ASRock ",
        150,
        "Supports 10th Gen and future generation Intel® Core™ Processors (Socket 1200),
12 Phase Dr.MOS Power Design,
Supports DDR4 4666MHz+ (OC)
2 PCIe 3.0 x16, 3 PCIe 3.0 x1, 1 M.2 (Key E) for WiFi,
AMD Quad CrossFireX™ and CrossFireX™,
Graphics Output Options: HDMI, DisplayPort,
7.1 CH HD Audio (Realtek ALC1220 Audio Codec), Nahimic Audio,
8 SATA3, 2 Ultra M.2 (PCIe Gen3 x4 & SATA3),
2 USB 3.2 Gen2 (Rear Type A+C), 9 USB 3.2 Gen1 (4 Front, 4 Rear, Front Type-C),
Phantom Gaming 2.5 Gigabit LAN, Intel® Gigabit LAN,
ASRock Polychrome SYNC,",
        90,
        140
    );