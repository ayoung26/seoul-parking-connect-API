import { useAppStore } from "../../stores/AppStore";
import styled from "styled-components";

const FilterContainer = styled.div`
    position: absolute;
    width: 100%;
    display: flex;
    gap: 0.5rem;
    padding: 15px;
    overflow-x: auto;
    white-space: nowrap;
    z-index: 10;

    @media (min-width: 1024px) {
        padding: 25px;
    }

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const FilterButton = styled.button<{
    $isActive: boolean;
    $activeColor: string;
}>`
    background-color: ${({ $isActive, $activeColor }) =>
        $isActive ? $activeColor : "#ffffff"};
    color: ${({ $isActive }) => ($isActive ? "white" : "#666")};

    font-size: 0.9rem;
    border-radius: 20px;
    padding: 7px 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

    @media (min-width: 1024px) {
        padding: 10px 15px;
        font-size: 1rem;
    }
`;

const FilterIcon = styled.img`
    width: 15px;
    height: 15px;
    margin-right: 10px;
`;

const FilterButtons = () => {
    const { activeFilters, toggleFilter } = useAppStore();

    return (
        <FilterContainer>
            <FilterButton
                $isActive={activeFilters.paid}
                $activeColor='#FFBC3B'
                onClick={() => toggleFilter("paid")}
            >
                <FilterIcon
                    src={
                        activeFilters.paid
                            ? "/filterIcon/filterIcon1-white.png"
                            : "/filterIcon/filterIcon1.png"
                    }
                    alt='filter Icon'
                />
                유료
            </FilterButton>
            <FilterButton
                $isActive={activeFilters.free}
                $activeColor='#40A3FF'
                onClick={() => toggleFilter("free")}
            >
                <FilterIcon
                    src={
                        activeFilters.free
                            ? "/filterIcon/filterIcon1-white.png"
                            : "/filterIcon/filterIcon2.png"
                    }
                    alt='filter Icon'
                />
                무료
            </FilterButton>
            <FilterButton
                $isActive={activeFilters.onStreet}
                $activeColor='#22C8AA'
                onClick={() => toggleFilter("onStreet")}
            >
                <FilterIcon
                    src={
                        activeFilters.onStreet
                            ? "/filterIcon/filterIcon3-white.png"
                            : "/filterIcon/filterIcon3.png"
                    }
                    alt='filter Icon'
                />
                노상
            </FilterButton>
            <FilterButton
                $isActive={activeFilters.offStreet}
                $activeColor='#2F8B6F'
                onClick={() => toggleFilter("offStreet")}
            >
                <FilterIcon
                    src={
                        activeFilters.offStreet
                            ? "/filterIcon/filterIcon4-white.png"
                            : "/filterIcon/filterIcon4.png"
                    }
                    alt='filter Icon'
                />
                노외
            </FilterButton>
            <FilterButton
                $isActive={activeFilters.available}
                $activeColor='#C854FF'
                onClick={() => toggleFilter("available")}
            >
                <FilterIcon
                    src={
                        activeFilters.available
                            ? "/filterIcon/filterIcon5-white.png"
                            : "/filterIcon/filterIcon5.png"
                    }
                    alt='filter Icon'
                />
                현재 주차 가능
            </FilterButton>
        </FilterContainer>
    );
};

export default FilterButtons;
