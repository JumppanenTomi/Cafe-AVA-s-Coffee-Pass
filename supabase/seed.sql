INSERT INTO site_settings 
    ("key", "value", "readableName", "desc")
VALUES 
('stampsRequired', '10', 'Stamps Required', 'How many stamps is required to get voucher. Keep in mind that changing this value too much might make customers that already have stamps very angry, since ratio changes too.'),
('logoUrl', NULL, 'URL of Logo', 'URL of logo that customers see. When undefined we are using fallback logo that is hosted in same place as website (better)'),
('stampRules', 'You are entitled to receive a coupon when you have collected a full coffee pass. The available coupons vary and you can get more information about them from the cafe.', 'Stamp Rules', 'Rules that are shown to user when clicking info icon in client page'),
('welcomeText', 'Welcome to our Digital Coffee Pass! Start your digital coffee journey with us today!', 'Welcome Text', 'Text that users see on landing page'),
('registerText', 'Once you have submitted your email, a sign-in link will be sent directly to your inbox. Using this link, you can securely access website.', 'Register Text', 'Instructions that users see when registering'),
('loginText', 'Once you have submitted your email, a sign-in link will be sent directly to your inbox. Using this link, you can securely access website.', 'Login Text', 'Instructions users see when loggin in.'),
('stampsCollectedText', 'You have collected all stamps!', 'Stamps Collected Text', 'This message is shown to user insted of "coffee pass" if user has collected all stamps.'),
('menuUrl', 'https://cafeava.fi/index.php/menu/', 'URL for Menu', 'URL of coffee/food menu');

INSERT INTO voucher_type 
    ("created_at", "name", "description", "redeem_message", "uses_per_voucher")
VALUES 
('2024-04-10 21:41:13.448446+00', 'Croissant', 'Freshly baked croissant', 'Enjoy your croissant', 2),
('2024-04-10 14:28:15.096461+00', 'Morning coffee', 'Morning coffee deal', 'Enjoy your morning coffee!', NULL),
('2024-04-10 14:29:02.803505+00', 'Cinnamon bun', NULL, 'Enjoy your cinnamon bun!', 2);

INSERT INTO public_vouchers ("created_at", "voucher_id", "used", "start", "end")
    VALUES 
('2024-04-25 14:55:16.974936+00', 1, NULL, NULL, '2024-05-31 16:20:28'),
('2024-04-25 14:55:16.974936+00', 2, NULL, NULL, '2024-05-31 16:20:28'),
('2024-04-25 14:55:16.974936+00', 3, NULL, NULL, '2024-05-31 16:20:28');