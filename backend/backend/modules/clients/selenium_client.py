from typing import List

from selenium.webdriver import Firefox, FirefoxOptions
from selenium.webdriver.remote.webelement import WebElement


class SeleniumClient:
    def __init__(self) -> None:
        options = FirefoxOptions()
        options.headless = True

        self.client = Firefox(options=options)

    def access_page(self, url: str) -> None:
        self.client.get(url)

    def find_by_id(self, id: str) -> WebElement:
        return self.client.find_element_by_id(id)

    def find_all_by_class(self, _class: str) -> List[WebElement]:
        return self.client.find_elements_by_class_name(_class)
